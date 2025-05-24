import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import EyeAnimation from "./shop/animations/eye-animation";
import MouthAnimation from "./shop/animations/mouth-animation";
import HandsAnimation from "./shop/animations/hand-animation";
import ShopKeeper from "./shop/shopkeeper";

import IntroShopText from "./shop/intro-shop-stats";
import ChoosePointLimit from "./shop/choose-point-limit";
import EndingShopText from "./shop/ending-shop-stats";

type ShopStatsProps = {
	onComplete: (finalSums: number[]) => void;
	onBack: () => void;
};

export default function ShopStats({ onComplete, onBack }: ShopStatsProps) {
	const [subStep, setSubStep] = useState(0);
	const [finalSums, setFinalSums] = useState<number[] | null>(null);
	const [pointLimit, setPointLimit] = useState<number>(27);

	// const [standardArray, setStandardArray] = useState([8, 8, 8, 8, 8, 8]);

	const subSteps = [
		<IntroShopText key="s-intro" onComplete={() => setSubStep(1)} />,
		<ChoosePointLimit
			key="s-pointlimit"
			onComplete={(limit) => {
				setPointLimit(limit);
				setSubStep(2);
			}}
			onBack={onBack}
		/>,
		<ShopKeeper
			key="s-shopkeeper"
			pointLimit={pointLimit}
			onComplete={() => setSubStep(3)}
		/>,
		// <ShopKeeper key="s-shopkeeper" onComplete={() => setFinalSums(); setSubStep(2)}/>,
		// <EndingShopText key="s-end" onComplete={() => onComplete(finalSums) }
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
