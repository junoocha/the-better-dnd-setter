import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroGambleText from "./gamble/intro-gamble-text";
import ChooseDice from "./gamble/choose-dice-number";
import RollDice from "./gamble/dice-roll";
import EndingGambleText from "./gamble/ending-gamble-text";

export default function GambleStats({ onComplete }) {
	const [subStep, setSubStep] = useState(0);
	const [diceInfo, setDiceInfo] = useState<{
		used: number;
		discarded: number;
	} | null>(null);

	const subSteps = [
		<IntroGambleText key="g-intro" onComplete={() => setSubStep(1)} />,
		<ChooseDice
			key="g-choice"
			onComplete={(info) => {
				setDiceInfo(info);
				setSubStep(2);
			}}
		/>,
		diceInfo && (
			<RollDice
				key="roll"
				used={diceInfo.used}
				discarded={diceInfo.discarded}
				onComplete={() => setSubStep(3)}
			/>
		),
		<EndingGambleText key="g-ending" onComplete={() => setSubStep(4)} />,
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
