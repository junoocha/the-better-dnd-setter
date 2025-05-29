// components/FillPDFButton.tsx
import { useState } from "react";

export default function FillPDFButton() {
	const [loading, setLoading] = useState(false); //track if request in progres s
	const [pdfUrl, setPdfUrl] = useState(""); // store url

	const handleClick = async () => {
		setLoading(true);

		// post request to the pdf api
		const response = await fetch("/api/fill-pdf", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				numbers: [
					{ x: 100, y: 500, value: "42" },
					{ x: 150, y: 460, value: "Dex" },
				],
			}),
		});

		// parse response
		const data = await response.json();
		setPdfUrl(data.url);
		setLoading(false);
	};

	return (
		<div>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button onClick={handleClick} disabled={loading}>
				{loading ? "Filling..." : "Generate PDF"}
			</button>
			{pdfUrl && (
				<div className="mt-4">
					<a href={pdfUrl} target="_blank" rel="noopener noreferrer">
						View/Download PDF
					</a>
				</div>
			)}
		</div>
	);
}
