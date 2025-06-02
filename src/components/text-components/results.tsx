"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
						opacity: [1, 0.8, 1],
						boxShadow: [
							"0 0 20px rgba(100,100,100,0.2)",
							"0 0 40px rgba(100,100,100,0.35)",
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
								initial={{ scale: 0.95, opacity: 0.9 }}
								animate={{
									scale: [1, 1.05, 1],
									rotate: [0, 3, -3, 0],
								}}
								transition={{
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
									duration: 2 + Math.random() * 2,
									delay: index * 0.15,
								}}
							>
								<span
									className={`text-2xl font-bold text-center block whitespace-nowrap ${textColor} [text-shadow:_0_0_30px]`}
								>
									{stat}: {value}
								</span>
							</motion.div>
						);
					})}
				</motion.div>
			</div>

			<div className="mt-6 flex flex-col items-center gap-4">
				{pdfUrl && (
					<div className="flex gap-3 flex-wrap justify-center">
						<a
							href={pdfUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="px-4 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
						>
							View PDF
						</a>
						<a
							href={pdfUrl}
							download
							className="px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
						>
							Download PDF
						</a>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={storeInfo}
							disabled={storing || stored}
							className={`px-4 py-2 rounded font-medium transition ${
								stored
									? "bg-gray-400 text-white cursor-not-allowed"
									: "bg-green-600 text-white hover:bg-green-700"
							}`}
						>
							{stored ? "Stored!" : storing ? "Storing..." : "Store Info"}
						</button>
					</div>
				)}

				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
		</div>
	);
}
