"use client";
import { useEffect, useState } from "react";
import { generateSentence } from "@/lib/generate-sentences";
import TextAnimation from "../TextAnimation";

const AITextDemo = () => {
	const [sentences, setSentences] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Function to fetch the sentences
		const fetchSentences = async () => {
			const prompts = ["Write a fantasy-style insult."];

			const results: string[] = [];

			for (const prompt of prompts) {
				try {
					const text = await generateSentence(prompt);
					results.push(text);
				} catch (e) {
					console.error("Failed to generate:", e);
				}
			}

			setSentences(results); // Set the fetched sentences
			setLoading(false); // Mark the loading as complete
		};

		fetchSentences();
	}, []);

	return (
		<div>
			{loading ? (
				<p className="text-gray-500 text-center">
					Summoning the bard's words...
				</p>
			) : (
				<TextAnimation sentences={sentences} /> // Render TextAnimation once sentences are fetched
			)}
		</div>
	);
};

export default AITextDemo;
