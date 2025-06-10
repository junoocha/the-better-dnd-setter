import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ShopKeeper from "./shop/shopkeeper";
import ShopKeeperWakeUp from "./shop/shopkeeper-wakeup";
import IntroShopText from "./shop/intro-shop-stats";
import ChoosePointLimit from "./shop/choose-point-limit";
import AlertShopKeeper from "./shop/alert-shopkeeper";
import EndingShopText from "./shop/ending-shop-stats";

type ShopStatsProps = {
	onComplete: (finalSums: number[]) => void;
	onBack: () => void;
};

export default function ShopStats({ onComplete, onBack }: ShopStatsProps) {
	const [subStep, setSubStep] = useState(0);

	// keep final sums aftershopkeeper to display and give back to parent
	const [finalSums, setFinalSums] = useState<number[] | null>(null);

	// point limit before shopping
	const [pointLimit, setPointLimit] = useState<number>(27);

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
		<AlertShopKeeper
			key="s-alertshopkeeper"
			onComplete={() => setSubStep(3)}
		/>,
		<ShopKeeperWakeUp
			key="s-shopkeeper-wakeup"
			onComplete={() => setSubStep(4)}
		/>,
		<ShopKeeper
			key="s-shopkeeper"
			pointLimit={pointLimit}
			onComplete={(finalStats) => {
				setFinalSums(finalStats);
				setSubStep(5);
			}}
		/>,
		<EndingShopText
			key="s-end"
			finalSums={finalSums ?? [0, 0, 0, 0, 0, 0]} // fallback to avoid crash
			onComplete={() => onComplete(finalSums ?? [0, 0, 0, 0, 0, 0])}
		/>,
	];

	return (
		<div className="flex flex-col gap-6 items-center text-center px-4 sm:px-0 py-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={`s-${subStep}`}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{ duration: 0.5 }}
				>
					{subSteps[subStep]}
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
