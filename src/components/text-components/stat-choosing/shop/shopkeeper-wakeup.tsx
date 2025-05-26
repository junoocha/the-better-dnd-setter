import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import { shopKeeperWakeUp } from "../../sentence-arrays/shop-text-data";

import EyeAnimation from "./animations/eye-animation";
import TextAnimation from "@/components/text-animation/text-animation";
import MouthAnimation from "./animations/mouth-animation";

type ShopStatsProps = {
	onComplete: () => void;
};

export default function ShopKeeperWakeUp({ onComplete }: ShopStatsProps) {
	const randomSentences = useMemo(() => {
		const index = Math.floor(Math.random() * shopKeeperWakeUp.length);
		return shopKeeperWakeUp[index];
	}, []);
	return (
		// <AnimatePresence mode="wait">
		// 	<motion.div
		// 		initial={{ opacity: 0, y: 10 }}
		// 		animate={{ opacity: 1, y: 0 }}
		// 		exit={{ opacity: 0, y: -10 }}
		// 		transition={{ duration: 0.5 }}
		// 	>
		<div className="flex flex-col gap-6 items-center text-center">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 3 }}
			>
				<TextAnimation
					initialSentences={randomSentences}
					fadeTrue={true}
					onComplete={onComplete}
				/>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1.5 }}
			>
				<div className="flex flex-col gap-2 p-24 m-2">
					<EyeAnimation />
				</div>
			</motion.div>
		</div>
		// 	</motion.div>
		// </AnimatePresence>
	);
}
