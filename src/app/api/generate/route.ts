import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { prompt } = await req.json();

	const token = process.env.HUGGINGFACE_API_TOKEN;
	const model = process.env.HUGGINGFACE_MODEL || "gpt2"; // Default to gpt2 if no model in env.

	if (!token) {
		console.error("Hugging Face API Token is missing!");
		return NextResponse.json(
			{ error: "Missing Hugging Face API Token" },
			{ status: 500 },
		);
	}

	try {
		const response = await fetch(
			`https://api-inference.huggingface.co/models/${model}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ inputs: prompt }),
			},
		);

		if (!response.ok) {
			const error = await response.text();
			console.error("Hugging Face API error:", error);
			return NextResponse.json({ error }, { status: response.status });
		}

		const data = await response.json();
		const generatedText =
			data[0]?.generated_text || "No generated text received.";
		return NextResponse.json({ result: generatedText });
	} catch (error) {
		console.error("Server error:", error);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
