import { useState, useEffect } from "react";

type TextAnimationProps = {
	fadeTrue: boolean;
	sentences: string[];
	speed?: number;
	delayBetweenSentences?: number;
	fadeDuration?: number;
};

const TextAnimation = ({
	sentences,
	fadeTrue,
	speed = 50,
	delayBetweenSentences = 1000,
	fadeDuration = 2000,
}: TextAnimationProps) => {
	const [displayedText, setDisplayedText] = useState<string>("");
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
	const [fadingOut, setFadingOut] = useState<boolean>(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentSentenceIndex >= sentences.length) return;

		const currentSentence = sentences[currentSentenceIndex];
		let currentIndex = 0;

		setDisplayedText("");
		setFadingOut(false);

		const typeCharacter = () => {
			if (currentIndex < currentSentence.length) {
				const char = currentSentence[currentIndex];
				setDisplayedText((prev) => prev + char);
				currentIndex += 1;
				setTimeout(typeCharacter, speed);
			} else {
				// After sentence is fully typed
				setTimeout(() => {
					setFadingOut(true);

					setTimeout(() => {
						if (!fadeTrue) {
							// setDisplayedText("");
							setFadingOut(false);
							setCurrentSentenceIndex((prev) => prev + 1);
						} else {
							// If fadeTrue is true, just fade out, do not clear or advance
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
	]);

	return (
		<div>
			<p
				style={{ transitionDuration: `${fadeDuration}ms` }}
				className={
					fadeTrue
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
