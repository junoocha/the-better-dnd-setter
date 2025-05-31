"use client";
import { useState, useEffect } from "react";

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
			<div className="relative w-64 h-64 mx-auto rounded-full">
				{/* Center content */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
					<span className="text-white font-bold">Your Stats</span>
				</div>

				{/* Radial stat items */}
				{Object.entries(assignment).map(([stat, value], index) => {
					const angle = (360 / Object.keys(assignment).length) * index;
					const radius = 100; // px distance from center
					const rad = (angle * Math.PI) / 180;
					const x = radius * Math.cos(rad);
					const y = radius * Math.sin(rad);

					return (
						<div
							key={stat}
							className="absolute"
							style={{
								left: `calc(50% + ${x}px)`,
								top: `calc(50% + ${y}px)`,
								transform: "translate(-50%, -50%)",
							}}
						>
							<span className="text-white text-sm text-center block whitespace-nowrap">
								{stat}: {value}
							</span>
						</div>
					);
				})}
			</div>

			<div className="mt-4 space-y-3">
				{pdfUrl && (
					<>
						<a href={pdfUrl} target="_blank" rel="noopener noreferrer">
							View PDF
						</a>
						<a href={pdfUrl} download>
							Download PDF
						</a>
					</>
				)}

				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={storeInfo}
					disabled={storing || stored}
					className={`transition-opacity duration-300 ${
						stored ? "opacity-50 cursor-not-allowed" : ""
					}`}
				>
					{stored ? "Stored!" : storing ? "Storing..." : "Store Info"}
				</button>

				{error && <p className="text-red-500">{error}</p>}
			</div>
		</div>
	);
}
