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
			<div className="text-white text-xl space-y-4">
				<h2 className="text-2xl font-bold">Your Final Stats</h2>
				<ul className="space-y-1">
					{Object.entries(assignment).map(([stat, value]) => (
						<li key={stat}>
							<span className="font-semibold">{stat}:</span> {value}
						</li>
					))}
				</ul>
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
