// fisher yates shuffle since the previous one was too archaic
export const shuffleArray = (array: string[]): string[] => {
	// input is an array of strings, output an array of strings
	const shuffled = [...array]; // clone array
	for (let i = shuffled.length - 1; i > 0; i--) {
		// reverse loop from end to beginning
		const j = Math.floor(Math.random() * (i + 1)); // random index between 0 and i
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // destructive swap / swap i element with j element
	}
	return shuffled;
};
