import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import EyeAnimation from "./animations/eye-animation";
import MouthAnimation from "./animations/mouth-animation";
import HandsAnimation from "./animations/hand-animation";

type ShopStatsProps = {
	onComplete: (finalSums: number[]) => void;
	pointLimit: number;
};

export default function ShopStats({ onComplete, pointLimit }: ShopStatsProps) {
	const [finalSums, setFinalSums] = useState<number[] | null>(null);

	const [standardArray, setStandardArray] = useState([8, 8, 8, 8, 8, 8]);

	return (
		<AnimatePresence mode="wait">
			<motion.div
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
			<HandsAnimation
				standardArray={standardArray}
				setStandardArray={setStandardArray}
			/>
		</AnimatePresence>
	);
}
