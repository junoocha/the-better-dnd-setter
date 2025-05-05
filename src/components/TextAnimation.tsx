import { useState, useEffect } from "react";

// props for tsx
type TextAnimationProps = {
	initialSentences: string[];
	loopSentences: string[];
	fadeTrue: boolean;
	speed?: number;
	delayBetweenSentences?: number;
	fadeDuration?: number;
};

const TextAnimation = ({
	initialSentences, // array of sentences to be inputted
	loopSentences,
	fadeTrue, // if true, should fade automatically, if not, will fade when step ends
	speed = 50,
	delayBetweenSentences = 1000,
	fadeDuration = 2000,
}: TextAnimationProps) => {
	const [displayedText, setDisplayedText] = useState<string>(""); // useState for the displayed text
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0); // use state for the current index of the sentence (if multiple sentences used)
	const [fadingOut, setFadingOut] = useState<boolean>(false); // fade out boolean
	const [isInLoopPhase, setIsInLoopPhase] = useState<boolean>(false);

	// flip flop between sentence array
	const sentences = isInLoopPhase ? loopSentences : initialSentences;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// if the index reaches end of array, just end/return
		if (currentSentenceIndex >= sentences.length) {
			// transition to loop sentences after initial ones
			if (!isInLoopPhase && loopSentences.length > 0) {
				setCurrentSentenceIndex(0);
				setIsInLoopPhase(true);
			}
			return;
		}

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

				setTimeout(typeCharacter, pause);
			} else {
				// after sentence is fully typed
				setTimeout(() => {
					setFadingOut(true);

					setTimeout(() => {
						if (!fadeTrue) {
							// don't fade out and just move on to the next sentence
							setFadingOut(false);
							setCurrentSentenceIndex((prev) => prev + 1);
						} else {
							// if fadeTrue is true, just fade out, do not clear or advance. clear the display text
							setFadingOut(false);
							setDisplayedText("");
						}
					}, fadeDuration);
				}, delayBetweenSentences);
			}
		};

		typeCharacter();
	}, [
		currentSentenceIndex,
		sentences,
		speed,
		delayBetweenSentences,
		fadeDuration,
		isInLoopPhase,
		loopSentences,
	]);

	return (
		<div>
			<p
				style={{ transitionDuration: `${fadeDuration}ms` }}
				className={
					fadeTrue // conditional. If fade exists, then fade it out. Otherwise, don't fade it out til the step completes
						? `transition-opacity ${fadingOut ? "opacity-0" : "opacity-100"}`
						: ""
				}
			>
				{displayedText}
			</p>
		</div>
	);
};

export default TextAnimation;
