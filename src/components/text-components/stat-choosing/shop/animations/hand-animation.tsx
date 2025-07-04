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
	return (
		<div className="flex items-center justify-center gap-1 sm:gap-4">
			{/* left Hand with hover animation */}
			<motion.img
				src={leftHand}
				alt="Left Hand"
				className="w-15 sm:w-24 md:w-50 h-auto max-w-[25%]"
				animate={{
					y: [0, -5, 0],
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "mirror",
				}}
			/>

			{/* the numbers with buttons */}
			<motion.div
				key="shop-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3"
			>
				<h1 className="flex gap-2 sm:gap-4 md:gap-6 text-2xl sm:text-4xl md:text-5xl font-bold text-green-400 relative">
					{standardArray.map((val, i) => (
						<div key={`stat-${i}`} className="flex flex-col items-center">
							{/* */}

							{/* up Button */}
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="text-xs sm:text-sm text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded mb-1"
								onClick={() => onChange(i, "up")}
								disabled={val >= 15}
							>
								<ChevronUp size={20} className="sm:w-5 sm:h-5 w-4 h-4" />
							</button>

							{/* animated stat Number */}
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

							{/* down Button */}
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="text-xs sm:text-sm text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded mt-1"
								onClick={() => onChange(i, "down")}
								disabled={val <= 8}
							>
								<ChevronDown size={20} className="sm:w-5 sm:h-5 w-4 h-4" />
							</button>
						</div>
					))}
				</h1>
			</motion.div>

			{/* right Hand with hover animation */}
			<motion.img
				src={rightHand}
				alt="Right Hand"
				className="w-14 sm:w-24 md:w-47 h-auto max-w-[25%]"
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
