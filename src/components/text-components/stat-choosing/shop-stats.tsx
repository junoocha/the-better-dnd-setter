import TextAnimation from "../../text-animation/text-animation";
import { useTextAnimation } from "../../text-animation/text-animator";
import {
	intro,
	introLoopSentences,
} from ".././sentence-arrays/intro-text-data";
import { useEffect } from "react";
import { useLoopPhase } from "../../text-animation/loop-phase-context";

type Props = {
	onComplete: () => void;
};

export default function ShopStats({ onComplete }: Props) {
	const { setIsIntroLoopPhase } = useLoopPhase();

	const handleLoopStart = () => {
		// console.log("Intro loop started, setting isIntroLoopPhase to true");
		setIsIntroLoopPhase(true);
	};

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={intro}
				loopSentences={introLoopSentences}
				fadeTrue={false}
				onLoopStart={handleLoopStart}
			/>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onComplete}
				className="px-4 py-2 bg-blue-600 rounded hover:bg-green-700"
			>
				Wake up the bard?
			</button>
		</div>
	);
}
