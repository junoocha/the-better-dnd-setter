import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import EyeAnimation from "./shop/animations/eye-animation";
import IntroShopText from "./shop/intro-shop-stats";
import MouthAnimation from "./shop/animations/mouth-animation";
import ShopKeeper from "./shop/shopkeeper";
import EndingShopText from "./shop/ending-shop-stats";

type ShopStatsProps = {
	onComplete: (finalSums: number[]) => void;
	onBack: () => void;
};

export default function ShopStats({ onComplete, onBack }: ShopStatsProps) {
	const [subStep, setSubStep] = useState(0);
	const [finalSums, setFinalSums] = useState<number[] | null>(null);

	// const subSteps = [
	// 	<IntroShopText key="s-intro" onComplete={() => setSubStep(1)} />,
	// 	<ShopKeeper key="s-shopkeeper" onComplete={() => setFinalSums(); setSubStep(2)}/>,
	// 	<EndingShopText key="s-end" onComplete={() => onComplete(finalSums) }
	// ];

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={subStep}
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.5 }}
			>
				{/* {subSteps[subStep]} */}
				<p>sup</p>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						padding: 0,
						margin: 0,
					}}
				>
					<EyeAnimation />
					<MouthAnimation />
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
