import { useState, useEffect } from "react";
import { shuffleArray } from "./shuffle-array";
import { useMemo } from "react";

// custom hook split for reuse & organization
type UseTextAnimationProps = {
	initialSentences?: string[];
	loopSentences?: string[];
	fadeTrue: boolean;
	numSentences?: number;
	speed?: number;
	delayBetweenSentences?: number;
	fadeDuration?: number;
};

export const useTextAnimation = (
	{
		initialSentences, // array of sentences to be inputted
		loopSentences,
		fadeTrue, // if true, should fade automatically, if not, will fade when step ends
		numSentences, // the number of sentences to be shown.
		speed = 3, //default is 30 but to make it quick... its now at 3
		delayBetweenSentences = 1500,
		fadeDuration = 2000,
	}: UseTextAnimationProps,
	onLoopStart?: () => void,
) => {
	const [displayedText, setDisplayedText] = useState<string>(""); // useState for the displayed text
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0); // use state for the current index of the sentence (if multiple sentences used)
	const [fadingOut, setFadingOut] = useState<boolean>(false); // fade out boolean
	const [isInLoopPhase, setIsInLoopPhase] = useState<boolean>(false); // determine whether the initial sentence array has been run through
	const [currentLoopSentences, setCurrentLoopSentences] = useState<string[]>(
		loopSentences ?? [], // fall back on empty array if undefined
	); // storing the new sentence array after being shuffled

	// flip flop between sentence array
	const sentences = useMemo(() => {
		return isInLoopPhase
			? currentLoopSentences
			: numSentences
				? shuffleArray(initialSentences ?? []).slice(0, numSentences)
				: (initialSentences ?? []);
	}, [isInLoopPhase, currentLoopSentences, initialSentences, numSentences]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// if the index reaches end of array, just end/return
		if (currentSentenceIndex >= sentences.length) {
			// transition to loop sentences after initial ones
			if (!isInLoopPhase && (loopSentences?.length ?? 0) > 0) {
				setCurrentLoopSentences(shuffleArray(loopSentences ?? [])); // fall back on empty array if undefined
				setCurrentSentenceIndex(0);
				setIsInLoopPhase(true);

				if (onLoopStart) onLoopStart();
			} else if (isInLoopPhase) {
				setCurrentLoopSentences(shuffleArray(currentLoopSentences));
				setCurrentSentenceIndex(0);
			}
			return;
		}

		const timeouts: NodeJS.Timeout[] = [];

		// get the first sentence
		const currentSentence = sentences[currentSentenceIndex];
		let currentIndex = 0;

		// set initial stuff
		setDisplayedText("");
		setFadingOut(false);

		const typeCharacter = () => {
			if (currentIndex < currentSentence.length) {
				const char = currentSentence[currentIndex];
				setDisplayedText((prev) => prev + char);
				currentIndex += 1;

				let pause = speed;
				// add a longer pause after certain characters
				if (char === "." || char === "!" || char === "?") {
					pause = speed + 600; // pause longer after sentence end
				} else if (
					char === "." &&
					currentSentence.slice(currentIndex - 1, currentIndex + 2) === "..."
				) {
					pause = speed + 600;
					currentIndex += 2; // skip the next 2 periods (already added one)
					// biome-ignore lint/style/useTemplate: <explanation>
					setDisplayedText((prev) => prev + "..");
				}

				timeouts.push(setTimeout(typeCharacter, pause));
			} else {
				timeouts.push(
					setTimeout(() => {
						setFadingOut(true);

						timeouts.push(
							setTimeout(() => {
								if (!fadeTrue) {
									// move on to next sentence
									setFadingOut(false);
									setCurrentSentenceIndex((prev) => prev + 1);
								} else {
									// don't fade out but just move on
									setFadingOut(false);
									setDisplayedText("");
								}
							}, fadeDuration),
						);
					}, delayBetweenSentences),
				);
			}
		};

		typeCharacter();

		return () => {
			timeouts.forEach(clearTimeout);
		};
	}, [
		currentSentenceIndex,
		sentences,
		speed,
		delayBetweenSentences,
		fadeDuration,
		isInLoopPhase,
		loopSentences,
	]);

	return {
		displayedText,
		fadingOut,
		fadeDuration,
		fadeTrue,
		isInLoopPhase,
	};
};
