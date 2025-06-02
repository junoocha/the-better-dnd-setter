// pages/api/store-info.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// iniitlaize supabase client
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

	// get stats and file url from request
	const { stats, file_url } = req.body;

	if (!stats || !file_url) {
		return res.status(400).json({ message: "Missing stats or file_url" });
	}

	try {
		// insert data into table character_stats
		const { error } = await supabase.from("character_stats").insert([
			{
				stats,
				file_url,
			},
		]);

		if (error) throw error;

		return res.status(200).json({ message: "Stored successfully" });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: "Error storing info" });
	}
}
