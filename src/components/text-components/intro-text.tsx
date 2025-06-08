import TextAnimation from "../text-animation/text-animation";
import { intro, introLoopSentences } from "./sentence-arrays/intro-text-data";
import { useLoopPhase } from "../text-animation/loop-phase-context";
import { motion } from "framer-motion";

type Props = {
	onComplete: (nextStep: number) => void;
};

export default function IntroText({ onComplete }: Props) {
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

			<motion.button
				onClick={() => onComplete(1)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="relative px-4 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				Wake up the bard?
			</motion.button>

			<motion.button
				onClick={() => onComplete(6)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="relative px-4 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				Grab a Pre-existing Hero's Stats
			</motion.button>
		</div>
	);
}
