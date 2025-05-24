import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import EyeAnimation from "./shop/animations/eye-animation";
import IntroShopText from "./shop/intro-shop-stats";
import MouthAnimation from "./shop/animations/mouth-animation";
import HandsAnimation from "./shop/animations/hand-animation";
import ShopKeeper from "./shop/shopkeeper";
import EndingShopText from "./shop/ending-shop-stats";

type ShopStatsProps = {
	onComplete: (finalSums: number[]) => void;
	onBack: () => void;
};

export default function ShopStats({ onComplete, onBack }: ShopStatsProps) {
	const [subStep, setSubStep] = useState(0);
	const [finalSums, setFinalSums] = useState<number[] | null>(null);

	const standardArray = [8, 8, 8, 8, 8, 8];

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
				<p>Welcome Weirdo</p>

				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 10,
						padding: 100,
						margin: 10,
					}}
				>
					<EyeAnimation />
					<MouthAnimation />
				</div>
			</motion.div>
			<HandsAnimation standardArray={standardArray} />
			{/* <motion.div
				key="showing-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3"
			>
				<h1 className="flex gap-20 text-5xl font-bold text-green-400 relative">
					{standardArray.map((val, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className="relative inline-block"
							initial={{ scale: 0.8, opacity: 0.7 }}
							animate={{
								scale: [1, 1.05, 1],
								rotate: [0, 3, -3, 0],
								transition: {
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
									duration: 2 + Math.random() * 2,
									delay: i * 0.2,
								},
							}}
						>
							{val}
						</motion.span>
					))}
				</h1>
			</motion.div> */}
		</AnimatePresence>
	);
}
