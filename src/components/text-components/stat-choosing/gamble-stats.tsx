import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroGambleText from "./gamble/intro-gamble-text";
import ChooseDice from "./gamble/choose-dice-number";

export default function GambleStats({ onComplete, onBack }) {
	const [subStep, setSubStep] = useState(0);

	const subSteps = [
		<IntroGambleText key="g-intro" onComplete={() => setSubStep(1)} />,
		<ChooseDice key="g-choice" onComplete={() => setSubStep(2)} />,
		// <GambleResult
		// 	key="result"
		// 	onFinish={() => {
		// 		// Finalize and return control to parent
		// 		onComplete();
		// 	}}
		// />,
	];

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={subStep}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.5 }}
			>
				{subSteps[subStep]}
			</motion.div>
		</AnimatePresence>
	);
}
