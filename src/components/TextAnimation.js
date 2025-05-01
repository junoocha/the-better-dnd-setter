import { useState, useEffect } from "react";

const TextAnimation = ({
	sentences,
	speed = 250,
	delayBetweenSentences = 1000,
	fadeDuration = 2000,
}) => {
	const [displayedText, setDisplayedText] = useState("");
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
	const [fadingOut, setFadingOut] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentSentenceIndex >= sentences.length) return;

		const currentSentence = sentences[currentSentenceIndex];
		let currentIndex = 0;

		setDisplayedText("");
		setFadingOut(false); // ensure fade-in at start

		const typeCharacter = () => {
			if (currentIndex < currentSentence.length) {
				const char = currentSentence[currentIndex];
				setDisplayedText((prev) => prev + char);
				currentIndex += 1;
				setTimeout(typeCharacter, speed);
			} else {
				// Wait, then fade out
				setTimeout(() => {
					setFadingOut(true);
					setTimeout(() => {
						setDisplayedText("");
						setFadingOut(false);
						setCurrentSentenceIndex((prev) => prev + 1);
					}, fadeDuration);
				}, delayBetweenSentences);
			}
		};

		typeCharacter();
	}, [currentSentenceIndex]);

	return (
		<div>
			<p
				className={`transition-opacity duration-${fadeDuration} ${
					fadingOut ? "opacity-0" : "opacity-100"
				}`}
			>
				{displayedText}
			</p>
		</div>
	);
};

export default TextAnimation;
