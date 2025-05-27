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
	showAndStay?: boolean;
	onComplete?: () => void;
};

export const useTextAnimation = (
	{
		initialSentences, // array of sentences to be inputted
		loopSentences,
		fadeTrue, // if true, should fade automatically, if not, will fade when step ends
		numSentences, // the number of sentences to be shown.
		speed = 25, //default is 30 but for testing sake, turn it to 3
		delayBetweenSentences = 1500,
		fadeDuration = 2000,
		showAndStay = false,
		onComplete,
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

	// conditional only for if I want to show one sentence, no loop, and no fade.
	const singleSentenceMode = showAndStay && numSentences === 1;

	// flip flop between sentence array
	const sentences = useMemo(() => {
		return isInLoopPhase
			? currentLoopSentences
			: numSentences
				? shuffleArray(initialSentences ?? []).slice(0, numSentences)
				: (initialSentences ?? []);
	}, [isInLoopPhase, currentLoopSentences, initialSentences, numSentences]);

	// only for one sentence
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!singleSentenceMode) return;

		const pool = initialSentences ?? loopSentences ?? [];
		const random = shuffleArray(pool)[0] ?? "";
		let currentIndex = 0;

		setDisplayedText("");
		setFadingOut(false);

		const timeouts: NodeJS.Timeout[] = [];

		const typeChar = () => {
			if (currentIndex < random.length) {
				const char = random[currentIndex];
				setDisplayedText((prev) => prev + char);
				currentIndex++;

				let pause = speed;
				if (char === "." || char === "!" || char === "?") {
					pause += 600;
				} else if (
					char === "." &&
					random.slice(currentIndex - 1, currentIndex + 2) === "..."
				) {
					pause += 600;
					currentIndex += 2;
					// biome-ignore lint/style/useTemplate: <explanation>
					setDisplayedText((prev) => prev + "..");
				}

				timeouts.push(setTimeout(typeChar, pause));
			}
		};

		typeChar();

		return () => timeouts.forEach(clearTimeout);
	}, [showAndStay, numSentences, initialSentences, loopSentences, speed]);

	// for all regular sentences
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (singleSentenceMode) return;

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
			} else if (onComplete) {
				onComplete();
			}
			return;
		}

		// get the first sentence
		const currentSentence = sentences[currentSentenceIndex];
		let currentIndex = 0;
		const timeouts: NodeJS.Timeout[] = [];

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
			} else if (!singleSentenceMode) {
				// Only run this block if not in single sentence mode
				timeouts.push(
					setTimeout(() => {
						setFadingOut(true);

						timeouts.push(
							setTimeout(() => {
								setFadingOut(false);
								setDisplayedText(""); // clear text
								setCurrentSentenceIndex((prev) => prev + 1); // always increment
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
