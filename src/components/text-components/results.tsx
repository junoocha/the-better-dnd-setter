"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import TextAnimation from "../text-animation/text-animation";

type Props = {
	assignment: Record<string, number>;
	onComplete: () => void;
};

export default function Results({ assignment, onComplete }: Props) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const generatePdf = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetch("/api/fill-pdf", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ assignments: assignment }),
			});
			if (!response.ok) throw new Error("Failed to generate PDF");
			const data = await response.json();
			setPdfUrl(data.url);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError(String(err));
			}
		} finally {
			setLoading(false);
		}
	};

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
			<div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button onClick={generatePdf} disabled={loading}>
					{loading ? "Generating PDF..." : "Generate PDF"}
				</button>

				{error && <p style={{ color: "red" }}>{error}</p>}

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
			</div>
		</div>
	);
}
