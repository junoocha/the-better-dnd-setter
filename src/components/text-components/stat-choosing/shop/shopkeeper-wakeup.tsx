import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

import { shopKeeperWakeUp } from "../../sentence-arrays/shop-text-data";

import EyeAnimation from "./animations/eye-animation";
import TextAnimation from "@/components/text-animation/text-animation";

type ShopStatsProps = {
	onComplete: () => void;
};

export default function ShopKeeperWakeUp({ onComplete }: ShopStatsProps) {
	const randomSentences = useMemo(() => {
		const index = Math.floor(Math.random() * shopKeeperWakeUp.length);
		return shopKeeperWakeUp[index];
	}, []);
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			{/* text animation but its shown after the eyes */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1.2 }}
				className="min-h-[4.5rem] overflow-hidden"
			>
				<TextAnimation
					initialSentences={randomSentences}
					fadeTrue={true}
					onComplete={onComplete}
				/>
			</motion.div>

			{/* eye animation is shown first */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
			>
				<div className="flex flex-col gap-2 p-10 m-2 ml-12">
					<EyeAnimation />
				</div>
			</motion.div>
		</div>
	);
}
