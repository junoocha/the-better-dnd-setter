"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../../utils/supabase_public";
import CopyStatsButton from "./final-results-stuff/copy-stats-button";
import TextAnimation from "../text-animation/text-animation";
import { getStatSentences } from "../../../utils/getFinalSentences";
import { useMediaQuery } from "react-responsive";

type Props = {
	onComplete: () => void;
};

type CharacterStatsRow = {
	stats: Record<string, number>;
	file_url: string;
};

export default function RandomStats({ onComplete }: Props) {
	const [assignment, setAssignment] = useState<Record<string, number> | null>(
		null,
	);
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [showLoading, setShowLoading] = useState(true);
	const isSmallScreen = useMediaQuery({ maxWidth: 640 });

	useEffect(() => {
		const delayTimer = setTimeout(() => {
			setShowLoading(false);
		}, 1000); // Wait 1 second before hiding loading state
		const fetchRandomStats = async () => {
			const { data, error } = (await supabase
				.rpc("get_random_stat")
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				.single()) as { data: CharacterStatsRow | null; error: any };

			if (error) {
				setError("Failed to load stats");
				console.error(error);
			} else if (data) {
				setAssignment(data.stats);
				setPdfUrl(data.file_url);
			}
		};

		// Run once immediately so user doesn't always wait 1s minimum
		fetchRandomStats();

		return () => clearInterval(delayTimer); // Cleanup on unmount
	}, []);

	if (showLoading || !assignment) {
		return (
			<div className="flex font-spectral items-center justify-center h-64 text-white text-xl">
				Jerry's flipping through his notebook...
			</div>
		);
	}

	const selectedSentences = getStatSentences(assignment, true);
	return (
		<div>
			<div className="center min-h-[6rem] overflow-hidden mb-2 mt-2">
				<TextAnimation
					loopSentences={selectedSentences}
					fadeTrue={false}
					numSentences={1}
					showAndStay={true}
				/>
			</div>
			<div className="flex justify-center items-center mb-20">
				<motion.div
					className="relative w-52 h-48 sm:w-72 sm:h-72 mx-auto rounded-full bg-gray-900 shadow-inner"
					initial={{ scale: 1, opacity: 1 }}
					animate={{
						scale: [1, 1.02, 1],
						opacity: [1, 0.9, 1],
						boxShadow: [
							"0 0 20px rgba(100,100,100,0.2)",
							"0 0 30px rgba(100,100,100,0.35)",
							"0 0 20px rgba(100,100,100,0.2)",
						],
					}}
					transition={{
						repeat: Number.POSITIVE_INFINITY,
						repeatType: "loop",
						duration: 6,
					}}
				>
					{/* Center content */}
					{/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-white font-bold">Your Stats</span>
                </div> */}

					{/* Radial stat items */}
					{Object.entries(assignment).map(([stat, value], index) => {
						const angle = (360 / Object.keys(assignment).length) * index;
						const radius = isSmallScreen ? 110 : 140; // px distance from center
						const rad = (angle * Math.PI) / 180;
						const x = radius * Math.cos(rad);
						const y = radius * Math.sin(rad);

						const statColors: Record<string, string> = {
							STR: "text-red-500",
							DEX: "text-green-500",
							CON: "text-yellow-500",
							INT: "text-blue-500",
							WIS: "text-purple-500",
							CHA: "text-pink-500",
						};

						const textColor = statColors[stat] || "text-white";

						return (
							<motion.div
								key={stat}
								className="absolute"
								style={{
									left: `calc(31% + ${x}px)`,
									top: `calc(50% + ${y}px)`,
								}}
								initial={{ scale: 0.95, opacity: 0.95 }}
								transition={{
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
									duration: 2 + Math.random() * 2,
									delay: index * 0.15,
								}}
							>
								<span
									className={`text-2xl sm:text-3xl font-spectral select-none font-bold text-center block whitespace-nowrap ${textColor} [text-shadow:_0_0_30px]`}
								>
									{stat}: {value}
								</span>
							</motion.div>
						);
					})}
				</motion.div>
			</div>

			<div className="mt-6 flex flex-col items-center gap-4">
				<div>
					<div className="relative flex justify-center">
						<div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
							<motion.a
								href={pdfUrl ?? "#"}
								target="_blank"
								rel="noopener noreferrer"
								whileHover={{ scale: pdfUrl ? 1.05 : 1 }}
								whileTap={{ scale: pdfUrl ? 0.95 : 1 }}
								className={`w-full font-spectral text-xl inline-flex justify-center items-center text-center px-4 py-2 rounded-sm text-white
                                         bg-black border-[3px]  border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition ${
																						!pdfUrl
																							? "pointer-events-none opacity-50"
																							: "opacity-100"
																					}`}
							>
								View PDF
							</motion.a>

							<CopyStatsButton stats={assignment} />
						</div>
					</div>
					<div className="relative mt-5 flex justify-center">
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={onComplete}
							className="px-4 py-2  rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition"
						>
							Go Back
						</motion.button>
					</div>
				</div>
			</div>
		</div>
	);
}
