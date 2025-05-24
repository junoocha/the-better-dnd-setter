"use client";
import { motion } from "framer-motion";

const leftHand = "/hand/left.png";
const rightHand = "/hand/right.png";

const HandsAnimation = ({ standardArray }: { standardArray: number[] }) => {
	return (
		<div className="flex items-center justify-center gap-4">
			{/* Left Hand with hover animation */}
			<motion.img
				src={leftHand}
				alt="Left Hand"
				className="w-32 h-auto"
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
				key="showing-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3"
			>
				<h1 className="flex gap-6 text-5xl font-bold text-green-400 relative">
					{standardArray.map((val, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className="relative inline-block"
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
					))}
				</h1>
			</motion.div>

			{/* Right Hand with hover animation */}
			<motion.img
				src={rightHand}
				alt="Right Hand"
				className="w-32 h-auto"
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
