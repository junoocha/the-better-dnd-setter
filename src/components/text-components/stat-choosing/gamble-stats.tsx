import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroGambleText from "./gamble/intro-gamble-text";
import ChooseDice from "./gamble/choose-dice-number";
import RollDice from "./gamble/dice-roll";
import EndingGambleText from "./gamble/ending-gamble-text";

type GambleStatsProps = {
	onComplete: (finalSums: number[]) => void;
	onBack: () => void;
};

export default function GambleStats({ onComplete, onBack }: GambleStatsProps) {
	const [subStep, setSubStep] = useState(0);

	// to grab the overall dice count
	const [diceInfo, setDiceInfo] = useState<{
		used: number;
		discarded: number;
	} | null>(null);

	const [finalSums, setFinalSums] = useState<number[] | null>(null); // keep this final sums from dice roll so we can display it in stats and move on

	const subSteps = [
		<IntroGambleText key="g-intro" onComplete={() => setSubStep(1)} />,
		<ChooseDice
			key="g-choice"
			onComplete={(info) => {
				setDiceInfo(info);
				setSubStep(2);
			}}
			onBack={() => {
				onBack();
			}}
		/>,
		diceInfo && (
			<RollDice
				key="roll"
				used={diceInfo.used}
				discarded={diceInfo.discarded}
				onComplete={(sums) => {
					setFinalSums(sums);
					setSubStep(3);
				}}
			/>
		),
		finalSums && (
			<EndingGambleText
				key="g-ending"
				finalSums={finalSums}
				onComplete={() => {
					onComplete(finalSums); // pass final sums to parent
				}}
			/>
		),
	];

	return (
		<div className="flex flex-col gap-6 items-center text-center px-4 sm:px-0 py-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={`g-${subStep}`}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.5 }}
					className="w-full"
				>
					{subSteps[subStep]}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
