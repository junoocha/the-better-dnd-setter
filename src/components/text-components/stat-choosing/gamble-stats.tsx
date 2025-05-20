import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroGambleText from "./gamble/intro-gamble-text";
import ChooseDice from "./gamble/choose-dice-number";
import RollDice from "./gamble/dice-roll";
import EndingGambleText from "./gamble/ending-gamble-text";

type GambleStatsProps = {
	onComplete: (finalSums: number[]) => void;
};

export default function GambleStats({ onComplete }: GambleStatsProps) {
	const [subStep, setSubStep] = useState(0);
	const [diceInfo, setDiceInfo] = useState<{
		used: number;
		discarded: number;
	} | null>(null);

	const [finalSums, setFinalSums] = useState<number[] | null>(null);

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
		finalSums && (
			<EndingGambleText
				key="g-ending"
				onComplete={() => {
					onComplete(finalSums); // pass final sums to parent
				}}
			/>
		),
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
