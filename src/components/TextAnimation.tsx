import { useState, useEffect } from "react";

type TextAnimationProps = {
	sentences: string[];
	speed?: number;
	delayBetweenSentences?: number;
	fadeDuration?: number;
};

const TextAnimation = ({
	sentences,
	speed = 200,
	delayBetweenSentences = 1000,
	fadeDuration = 2000,
}: TextAnimationProps) => {
	const [displayedText, setDisplayedText] = useState<string>("");
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
	const [fadingOut, setFadingOut] = useState<boolean>(false);

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
				className={`transition-opacity duration-[${fadeDuration}ms] ${
					fadingOut ? "opacity-0" : "opacity-100"
				}`}
			>
				{displayedText}
			</p>
		</div>
	);
};

export default TextAnimation;
