import TextAnimation from "../text-animation/text-animation";
import { intro, loopSentences } from "./sentence-arrays/intro-text-data";

type Props = {
	onComplete: () => void;
};

export default function IntroText({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={intro}
				loopSentences={loopSentences}
				fadeTrue={false}
			/>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onComplete}
				className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
			>
				Wake up the bard?
			</button>
		</div>
	);
}
