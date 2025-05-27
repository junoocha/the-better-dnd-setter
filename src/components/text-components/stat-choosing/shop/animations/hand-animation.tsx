"use client";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const leftHand = "/hand/left.png";
const rightHand = "/hand/right.png";

const HandsAnimation = ({
	standardArray,
	onChange,
}: {
	standardArray: number[];
	onChange: (index: number, direction: "up" | "down") => void;
}) => {
	// const handleIncrement = (index: number) => {
	// 	onChange((prev) => {
	// 		const updated = [...prev];
	// 		if (updated[index] < 15) {
	// 			updated[index]++;
	// 		}
	// 		return updated;
	// 	});
	// };

	// const handleDecrement = (index: number) => {
	// 	setStandardArray((prev) => {
	// 		const updated = [...prev];
	// 		if (updated[index] > 8) {
	// 			updated[index]--;
	// 		}
	// 		return updated;
	// 	});
	// };
	return (
		<div className="flex items-center justify-center gap-4">
			{/* Left Hand with hover animation */}
			<motion.img
				src={leftHand}
				alt="Left Hand"
				className="w-50 h-auto"
				animate={{
					y: [0, -5, 0],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "mirror",
				}}
			/>

			{/* Center Animated Text */}
			<motion.div
				key="shop-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3"
			>
				<h1 className="flex gap-6 text-5xl font-bold text-green-400 relative">
					{standardArray.map((val, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={`stat-${i}`} className="flex flex-col items-center">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="text-sm text-white px-2 py-1 rounded mb-1"
								onClick={() => onChange(i, "up")}
								disabled={val >= 15}
							>
								<ChevronUp size={24} />
							</button>
							<motion.span
								className="relative inline-block w-[2ch] text-center"
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
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="text-sm text-white px-2 py-1 rounded mt-1"
								onClick={() => onChange(i, "down")}
								disabled={val <= 8}
							>
								<ChevronDown size={24} />
							</button>
						</div>
					))}
				</h1>
			</motion.div>

			{/* Right Hand with hover animation */}
			<motion.img
				src={rightHand}
				alt="Right Hand"
				className="w-46 h-auto"
				animate={{
					y: [0, -5, 0],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "mirror",
					delay: 0.2,
				}}
			/>
		</div>
	);
};

export default HandsAnimation;
