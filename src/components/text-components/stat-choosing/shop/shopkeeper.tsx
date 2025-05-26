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
		<div className="flex flex-col gap-6 items-center text-center">
			<p>Welcome Weirdo - Remaining Points: {remainingPoints}</p>

			{/* Outer container for animations */}
			<div className="flex flex-col items-center justify-center gap-2 p-24 m-2">
				{/* Eyes */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 1.5 }}
				>
					<div className="relative flex justify-center items-center">
						{/* Eyes centered */}
						<EyeAnimation />

						{/* Signpost to the right of the eyes */}
						<div className="absolute right-[-230px] top-1/2 -translate-y-1/2 bg-black border-4 border-white-700 rounded-md px-4 py-2 shadow-md text-brown-900 font-bold text-lg select-none">
							<div>Remaining</div>
							<div className="text-2xl mt-1">{remainingPoints}</div>
						</div>
					</div>
				</motion.div>
				{/* Mouth */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 4.5 }}
				>
					<MouthAnimation />
				</motion.div>

				{/* Hands */}
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 3.5 }}
				>
					<HandsAnimation standardArray={stats} onChange={handleStatChange} />
				</motion.div>
			</div>
		</div>
	);
}
