// pages/api/generate-pdf.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { generatePDFBytes } from "../../utils/generate-pdf-bytes";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	const { assignments } = req.body;

	if (typeof assignments !== "object" || assignments === null) {
		return res.status(400).json({ message: "Invalid payload format" });
	}

	try {
		const pdfBytes = await generatePDFBytes(assignments);
		const fileName = `filled-${Date.now()}.pdf`;

		const { error: uploadError } = await supabase.storage
			.from("pdf-holder")
			.upload(fileName, pdfBytes, { contentType: "application/pdf" });

		if (uploadError) throw uploadError;

		const { data: urlData } = supabase.storage
			.from("pdf-holder")
			.getPublicUrl(fileName);

		if (!urlData?.publicUrl) throw new Error("Failed to generate public URL");

		return res.status(200).json({ url: urlData.publicUrl, fileName });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error generating PDF" });
	}
}
