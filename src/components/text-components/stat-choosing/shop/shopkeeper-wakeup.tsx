import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { shopKeeperWakeUp } from "../../sentence-arrays/shop-text-data";

import EyeAnimation from "./animations/eye-animation";
import TextAnimation from "@/components/text-animation/text-animation";
import MouthAnimation from "./animations/mouth-animation";

type ShopStatsProps = {
	onComplete: () => void;
};

export default function ShopKeeperWakeUp({ onComplete }: ShopStatsProps) {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 0.5 }}
			>
				<TextAnimation
					loopSentences={shopKeeperWakeUp}
					fadeTrue={true}
					numSentences={1}
					onLoopStart={() => {
						// Delay so the first loop sentence has time to show before moving on
						setTimeout(onComplete, 2500); // tweak this number to match timing
					}}
				/>

				<div className="flex flex-col gap-2 p-24 m-2">
					<EyeAnimation />
					{/* <MouthAnimation /> */}
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
