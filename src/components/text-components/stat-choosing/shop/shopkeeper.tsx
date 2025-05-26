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
	const [remainingPoints, setRemainingPoints] = useState(pointLimit);

	const [stats, setStats] = useState([8, 8, 8, 8, 8, 8]);

	const calculateCost = (from: number, to: number) => {
		let cost = 0;
		for (let i = from; i < to; i++) {
			cost += i >= 13 ? 2 : 1;
		}
		for (let i = from; i > to; i--) {
			cost -= i > 14 ? 2 : 1;
		}
		return cost;
	};

	const handleStatChange = (index: number, direction: "up" | "down") => {
		const current = stats[index];
		const next = direction === "up" ? current + 1 : current - 1;
		if (next < 8 || next > 15) return;

		const cost = calculateCost(current, next);
		const newRemaining = remainingPoints - cost;

		if (newRemaining < 0) return;

		const updated = [...stats];
		updated[index] = next;
		setStats(updated);
		setRemainingPoints(newRemaining);
	};

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -10 }}
				transition={{ duration: 1 }}
			>
				{/* {subSteps[subStep]} */}
				<p>Welcome Weirdo - Remaining Points: {remainingPoints}</p>

				<div className="flex flex-col gap-2 p-24 m-2">
					<EyeAnimation />
					<MouthAnimation />
					<HandsAnimation standardArray={stats} onChange={handleStatChange} />
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
