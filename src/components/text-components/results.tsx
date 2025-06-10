"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import CopyStatsButton from "./final-results-stuff/copy-stats-button";
import TextAnimation from "../text-animation/text-animation";
import { getStatSentences } from "../../../utils/getFinalSentences";
import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";

type Props = {
	assignment: Record<string, number>;
	onComplete: () => void;
};

export default function Results({ assignment, onComplete }: Props) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false); // for PDF gen
	const [storing, setStoring] = useState(false); // for DB store

	const [stored, setStored] = useState(false); // determine when data is stored once
	const [error, setError] = useState<string | null>(null);

	const [tooltipVisible, setTooltipVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const isSmallScreen = useMediaQuery({ maxWidth: 640 }); // determine if user is using phone

	// use api to generate pdf
	const generatePdf = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/generate-pdf", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ assignments: assignment }),
			});
			if (!response.ok) throw new Error("Failed to generate PDF");

			// set data
			const data = await response.json();
			setPdfUrl(data.url);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	};

	// api to connect to database and store relevant information
	const storeInfo = async () => {
		// if stored alreadu, don't store more
		if (!pdfUrl || storing || stored) return;

		setStoring(true);
		setError(null);

		try {
			const response = await fetch("/api/store-info", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					stats: assignment,
					file_url: pdfUrl,
				}),
			});
			if (!response.ok) throw new Error("Failed to store info");

			// confirm storage
			setStored(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setStoring(false);
		}
	};

	// generate PDF on initial mount
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		generatePdf();
	}, []);

	// hide tooltip when clicking outside it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node)
			) {
				setTooltipVisible(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// generate summary sentences once. kept remaking itself with the remounts from storage
	const selectedSentences = useMemo(
		() => getStatSentences(assignment, true),
		[assignment],
	);

	return (
		<div>
			{/* animated sentence */}
			<div className="center min-h-[6rem] overflow-hidden mb-2 mt-16 sm:mt-10">
				<TextAnimation
					loopSentences={selectedSentences}
					fadeTrue={false}
					numSentences={1}
					showAndStay={true}
				/>
			</div>

			{/* results container */}
			<div className="flex justify-center items-center mb-22">
				{/* container but with cool animation */}
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
					{/* stat items in circle */}
					{Object.entries(assignment).map(([stat, value], index) => {
						const angle = (360 / Object.keys(assignment).length) * index - 120;
						const radius = isSmallScreen ? 110 : 140; // px distance from center, smaller circle if small screen
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
							// the actual stats now, like generating it through map and stuff
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

			{/* loading screen but with jerry woo */}
			<div className="mt-6 flex flex-col items-center gap-4">
				{loading ? (
					<p className="text-white font-medium">
						Jerry's generating the PDF, please wait...
					</p>
				) : (
					// everything else, so all the buttons on the bottom.
					<div>
						<div className="relative w-full max-w-md mx-auto mt-2">
							{/* */}

							{/* tool tip */}
							<div
								ref={tooltipRef}
								className="absolute -top-5 right-[-2rem] group z-10"
							>
								{/* tooltip text */}
								<div
									className={`absolute top-1/2 transform -translate-y-1/2
												bg-black text-white text-xs p-2 rounded whitespace-normal
												transition-opacity duration-300
												opacity-0 pointer-events-none
												group-hover:opacity-100 group-hover:pointer-events-auto
												${tooltipVisible ? "opacity-100 pointer-events-auto" : ""}
												${isSmallScreen ? "left-full mr-2 w-20" : "left-full ml-2 w-30"}
											`}
								>
									Your stats will be added to our magical archive for mysterious
									analytical purposes. But beware! This won't save them for you
									to return to later!
								</div>

								{/* tooltip trigger */}
								{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
								<div
									onClick={() => setTooltipVisible((prev) => !prev)}
									className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-pointer select-none"
								>
									?
								</div>
							</div>

							{/* button row for see pdf, copy, and store. vertical stack mobile */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md mx-auto">
								<motion.a
									href={pdfUrl ?? "#"}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: pdfUrl ? 1.05 : 1 }}
									whileTap={{ scale: pdfUrl ? 0.95 : 1 }}
									className={`w-full font-spectral text-lg sm:text-xl inline-flex justify-center items-center text-center px-4 py-2 rounded-sm text-white
										 bg-black border-[3px]  border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition ${
												!pdfUrl
													? "pointer-events-none opacity-50"
													: "opacity-100"
											}`}
								>
									View PDF
								</motion.a>

								<CopyStatsButton stats={assignment} />

								<motion.button
									whileHover={!stored ? { scale: 1.05 } : undefined}
									whileTap={!stored ? { scale: 0.95 } : undefined}
									onClick={storeInfo}
									disabled={storing || stored || !pdfUrl}
									className={`px-4 py-2 rounded-sm font-medium transition ${
										stored
											? "bg-black rounded-sm text-white border-[3px] border-white shadow-[0_0_0_1px_black] cursor-not-allowed opacity-50"
											: " text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
									} ${!pdfUrl ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
								>
									{stored ? "Stored!" : storing ? "Storing..." : "Store Info"}
								</motion.button>
							</div>
						</div>

						{/* final button, own row */}
						<div className="relative mt-5 flex justify-center">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={onComplete}
								className="px-4 py-2  rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition"
							>
								Create More Stats
							</motion.button>
						</div>
					</div>
				)}

				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
		</div>
	);
}
