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
	const { assignments } = req.body; // e.g., [{ x: 100, y: 500, value: "42" }]
	if (
		typeof assignments !== "object" ||
		assignments === null ||
		Array.isArray(assignments)
	) {
		return res.status(400).json({ message: "Invalid payload format" });
	}

	try {
		const pdfBytes = await generatePDFBytes(assignments);
		const fileName = `filled-${Date.now()}.pdf`;

		// upload to supabase
		const { error: uploadError } = await supabase.storage
			.from("pdf-holder")
			.upload(fileName, pdfBytes, {
				contentType: "application/pdf",
			});

		if (uploadError) throw uploadError;

		// grab public url
		const { data: urlData } = supabase.storage
			.from("pdf-holder")
			.getPublicUrl(fileName);

		const publicUrl = urlData?.publicUrl;
		if (!publicUrl) {
			throw new Error("Failed to generate public URL.");
		}

		// insert data into table
		const { error: dbError } = await supabase.from("pdf storage").insert([
			{
				file_name: fileName,
				file_url: publicUrl,
			},
		]);

		if (dbError) throw dbError;

		// return the public URL to client
		return res.status(200).json({ url: urlData.publicUrl });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error writing or uploading PDF" });
	}
}
