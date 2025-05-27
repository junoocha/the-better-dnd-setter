import { useState } from "react";
import { motion } from "framer-motion";

import EyeAnimation from "./animations/eye-animation";
import MouthAnimation from "./animations/mouth-animation";
import HandsAnimation from "./animations/hand-animation";
import { shopKeeperRamble } from "../../sentence-arrays/shop-text-data";
import TextAnimation from "@/components/text-animation/text-animation";

type ShopStatsProps = {
	onComplete: (finalSums: number[]) => void;
	pointLimit: number;
};

export default function ShopStats({ onComplete, pointLimit }: ShopStatsProps) {
	const [finalSums, setFinalSums] = useState<number[] | null>(null);
	const [remainingPoints, setRemainingPoints] = useState(pointLimit);
	const [confirmed, setConfirmed] = useState(false);
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
		setFinalSums(updated);
	};

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 1.5 }}
			>
				<TextAnimation loopSentences={shopKeeperRamble} fadeTrue={false} />{" "}
			</motion.div>
			{/* Outer container for animations */}
			<div className="flex flex-col items-center justify-center gap-2 p-15 m-2">
				{/* Eyes */}

				<div className="relative flex justify-center items-center">
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 5.5 }}
					>
						<div className="bg-black border-4 border-white rounded-md px-4 py-2 shadow-md text-white font-bold text-sm max-w-[220px] text-left">
							<p className="mb-1">Max 15 Score</p>
							<ul className="list-disc list-inside text-xs font-normal leading-snug space-y-1">
								<li className="whitespace-nowrap">1 point per increase</li>
								<li className="whitespace-nowrap">13 → 14: 2 points</li>
								<li className="whitespace-nowrap">14 → 15: 2 points</li>
							</ul>
						</div>
					</motion.div>
					{/* Eyes centered */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 1.5 }}
					>
						<EyeAnimation />
					</motion.div>
					{/* Signpost to the right of the eyes */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 5.5 }}
					>
						<div className="bg-black border-4 border-white-700  rounded-md px-4 py-2 shadow-md text-brown-900 font-bold text-lg select-none">
							<div>Remaining</div>
							<div className="text-2xl mt-1">{remainingPoints}</div>
						</div>
					</motion.div>
				</div>

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

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 5.5 }}
				>
					<motion.button
						onClick={() => {
							if (remainingPoints === 0 && finalSums) {
								setConfirmed(true);
								onComplete(finalSums);
							}
						}}
						className="mt-6 px-6 py-2 font-bold rounded shadow transition duration-300"
						disabled={remainingPoints > 0}
						initial={{ opacity: 0 }}
						animate={{
							opacity: remainingPoints === 0 ? 1 : 0.3,
							boxShadow:
								remainingPoints === 0
									? "0 0 15px 4px rgba(34,197,94,0.7)" // green glow
									: "none",
							scale: remainingPoints === 0 ? 1.05 : 1,
						}}
						style={{
							cursor: remainingPoints === 0 ? "pointer" : "not-allowed",
							backgroundColor: remainingPoints === 0 ? "#16a34a" : "#4b5563", // green or gray
							color: "white",
						}}
					>
						Confirm Stats
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
}
