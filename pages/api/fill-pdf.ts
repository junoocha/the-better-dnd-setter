// pages/api/fill-pdf.ts
import { writeToPDF } from "../../utils/pdf-writer";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// only get post requests
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	// grab numbers from post
	const { numbers } = req.body; // e.g., [{ x: 100, y: 500, value: "42" }]
	if (!Array.isArray(numbers)) {
		return res.status(400).json({ message: "Invalid payload" });
	}

	try {
		// utility function called to write stuff in
		const fileUrl = await writeToPDF(numbers);
		res.status(200).json({ url: fileUrl });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error writing to PDF" });
	}
}
