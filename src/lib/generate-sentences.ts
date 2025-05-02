export async function generateSentence(prompt: string): Promise<string> {
	const response = await fetch("/api/generate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ prompt }),
	});

	if (!response.ok) {
		throw new Error("Failed to generate text");
	}

	const data = await response.json();
	return data.result;
}
