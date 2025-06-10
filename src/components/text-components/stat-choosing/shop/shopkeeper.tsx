import { useState } from "react";
import { motion } from "framer-motion";

import MouthAnimation from "./animations/mouth-animation";
import Face from "./animations/face-animation";
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
			cost -= i > 13 ? 2 : 1;
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
				className="min-h-[4.5rem] px-6 sm:px-0 text-center max-w-xl mx-auto"
			>
				<TextAnimation loopSentences={shopKeeperRamble} fadeTrue={false} />{" "}
			</motion.div>

			{/* Outer container for animations */}
			<div className="flex flex-col items-center justify-center gap-2 p-4 sm:p-6 md:p-8 m-2">
				{/* Mobile-only signs row above the face */}
				<div className="flex justify-between w-full px-4 mb-4 sm:hidden">
					{/* Left sign */}
					<div className="bg-black border-4 border-white rounded-md px-2 py-2 shadow-md text-white font-bold space-y-2 flex-1 mr-2">
						<h1 className="mb-1 text-center text-sm">Max 15 Score</h1>
						<ul className="list-disc font-spectral text-left list-inside text-[10px] font-normal leading-snug space-y-0.5">
							<li className="whitespace-nowrap">1 point per increase</li>
							<li className="whitespace-nowrap">13 → 14: 2 points</li>
							<li className="whitespace-nowrap">14 → 15: 2 points</li>
						</ul>
					</div>

					{/* Right sign */}
					<div className="bg-black border-4 border-white rounded-md px-1 py-1 shadow-md text-white font-bold space-y-2 flex-1 ml-2">
						<div className="font-spectral text-center text-brown-900 font-bold mt-4 select-none">
							<div className="text-xs">Remaining</div>
							<div className="text-lg mt-1 text-center">{remainingPoints}</div>
						</div>
					</div>
				</div>

				{/* Existing layout container: hide signs on mobile */}
				<div className="w-full mx-auto flex flex-row items-center justify-between">
					{/* Left: Info, hidden on mobile */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 5.5 }}
						className="hidden sm:block"
					>
						<div className="bg-black border-4 border-white rounded-md px-2 py-2 shadow-md text-white font-bold space-y-2">
							<h1 className="mb-1 text-center text-sm sm:text-sm md:text-base">
								Max 15 Score
							</h1>
							<ul className="list-disc font-spectral text-left list-inside text-[10px] sm:text-xs md:text-sm font-normal leading-snug space-y-0.5">
								<li className="whitespace-nowrap">1 point per increase</li>
								<li className="whitespace-nowrap">13 → 14: 2 points</li>
								<li className="whitespace-nowrap">14 → 15: 2 points</li>
							</ul>
						</div>
					</motion.div>

					{/* Center: Face */}
					<div className="flex-1 flex justify-center items-center px-2">
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 1, delay: 2 }}
							className="sm:mr-10"
						>
							<Face />
						</motion.div>
					</div>

					{/* Right: Remaining, hidden on mobile */}
					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 5.5 }}
						className="hidden sm:block"
					>
						<div className="bg-black border-4 border-white rounded-md px-1 py-1 shadow-md text-white font-bold space-y-2">
							<div className="font-spectral text-center text-brown-900 font-bold select-none">
								<div className="text-xs sm:text-sm md:text-lg">Remaining</div>
								<div className="text-lg sm:text-xl md:text-2xl mt-1 text-center">
									{remainingPoints}
								</div>
							</div>
						</div>
					</motion.div>
				</div>

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
						className="mt-6 px-6 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition duration-300"
						disabled={remainingPoints > 0}
						initial={{ opacity: 0 }}
						animate={{
							opacity: remainingPoints === 0 ? 1 : 0.3,
							boxShadow:
								remainingPoints === 0
									? "0 0 15px 4px rgba(34,197,94,0.7)" // green glow
									: "0 0 0px 0px rgba(0,0,0,0)",
						}}
						style={{
							cursor: remainingPoints === 0 ? "pointer" : "not-allowed",
							backgroundColor: "#000000", // green or gray
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
