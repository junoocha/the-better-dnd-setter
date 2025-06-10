import { useTextAnimation } from "./text-animator";

// props for tsx
type TextAnimationProps = {
	initialSentences?: string[];
	loopSentences?: string[];
	numSentences?: number;
	fadeTrue: boolean;
	speed?: number;
	delayBetweenSentences?: number;
	fadeDuration?: number;
	showAndStay?: boolean;
	onLoopStart?: () => void;
	onComplete?: () => void;
};

const TextAnimation = (props: TextAnimationProps) => {
	const { displayedText, fadingOut, fadeDuration, fadeTrue } = useTextAnimation(
		props,
		props.onLoopStart,
	);

	return (
		<div>
			<p
				style={{ transitionDuration: `${fadeDuration}ms` }}
				className={`text-center break-words whitespace-pre-wrap ${
					fadeTrue
						? `transition-opacity ${fadingOut ? "opacity-0" : "opacity-100"}`
						: ""
				}`}
			>
				{displayedText}
			</p>
		</div>
	);
};

export default TextAnimation;
