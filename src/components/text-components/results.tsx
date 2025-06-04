"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CopyStatsButton from "./final-results-stuff/copy-stats-button";

type Props = {
	assignment: Record<string, number>;
	onComplete: () => void;
};

export default function Results({ assignment, onComplete }: Props) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false); // for PDF gen
	const [storing, setStoring] = useState(false); // for DB store
	const [stored, setStored] = useState(false);
	const [error, setError] = useState<string | null>(null);

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
			const data = await response.json();
			setPdfUrl(data.url);
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setLoading(false);
		}
	};

	const storeInfo = async () => {
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
			setStored(true);
			// onComplete();
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
		} finally {
			setStoring(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		generatePdf();
	}, []);

	return (
		<div>
			<div className="flex justify-center items-center mb-20">
				<motion.div
					className="relative w-72 h-72 mx-auto rounded-full bg-gray-900 shadow-inner"
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
						const angle = (360 / Object.keys(assignment).length) * index - 120;
						const radius = 140; // px distance from center
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
									left: `calc(36% + ${x}px)`,
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
									className={`text-2xl select-none font-bold text-center block whitespace-nowrap ${textColor} [text-shadow:_0_0_30px]`}
								>
									{stat}: {value}
								</span>
							</motion.div>
						);
					})}
				</motion.div>
			</div>

			<div className="mt-6 flex flex-col items-center gap-4">
				{loading ? (
					<p className="text-white font-medium">
						Jerry's generating the PDF, please wait...
					</p>
				) : (
					<div>
						<div className="relative flex justify-center">
							<div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto">
								<motion.a
									href={pdfUrl ?? "#"}
									target="_blank"
									rel="noopener noreferrer"
									whileHover={{ scale: pdfUrl ? 1.05 : 1 }}
									whileTap={{ scale: pdfUrl ? 0.95 : 1 }}
									className={`w-full inline-flex justify-center items-center text-center px-4 py-2 rounded-sm text-white
										 bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition ${
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

							{/* tooltip floated right, not part of flex to keep it there*/}
							<div className="absolute -top-1 right-[-2rem] group">
								<div className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-default">
									?
								</div>
								<div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-48 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
									Your stats will be added to our magical archive for mysterious
									analytical purposes. But beware! This won’t save them for you
									to return to later!
								</div>
							</div>
						</div>
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
