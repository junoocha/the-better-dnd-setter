// pages/api/fill-pdf.ts
import { generatePDFBytes } from "../../utils/generate-pdf-bytes";
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	process.env.SUPABASE_SERVICE_ROLE_KEY!, // use service role key on backend for upload permission
);

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
		const pdfBytes = await generatePDFBytes(numbers);
		const fileName = `filled-${Date.now()}.pdf`;

		// 1. Upload to Supabase Storage
		const { error: uploadError } = await supabase.storage
			.from("pdf-holder")
			.upload(fileName, pdfBytes, {
				contentType: "application/pdf",
			});

		if (uploadError) throw uploadError;

		// 2. Get the public URL
		const { data: urlData } = supabase.storage
			.from("pdf-holder")
			.getPublicUrl(fileName);

		const publicUrl = urlData?.publicUrl;
		if (!publicUrl) {
			throw new Error("Failed to generate public URL.");
		}

		// 3. Insert metadata into Supabase table
		const { error: dbError } = await supabase.from("pdfs").insert([
			{
				file_name: fileName,
				file_url: publicUrl,
			},
		]);

		if (dbError) throw dbError;

		// 4. Return the public URL to client
		return res.status(200).json({ url: urlData.publicUrl });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error writing or uploading PDF" });
	}
}
