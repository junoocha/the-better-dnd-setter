import * as random from "@/components/text-components/sentence-arrays/grab-random-stats";
import * as normal from "@/components/text-components/sentence-arrays/final-results";

type SentenceMap = Record<string, string[]>;

export function getStatSentences(
	stats: Record<string, number>,
	isRandom: boolean,
): string[] {
	const source = (isRandom ? random : normal) as SentenceMap;

	const result: string[] = [];

	const lowStats: string[] = [];
	const highStats: string[] = [];

	// averages come first
	const hasLowAvg = Object.values(stats).some((v) => v <= 6);
	const hasHighAvg = Object.values(stats).some((v) => v >= 17);

	if (hasLowAvg && source.lowAvg) {
		result.push(...source.lowAvg);
	}
	if (hasHighAvg && source.highAvg) {
		result.push(...source.highAvg);
	}

	// collect low/high stats
	for (const [stat, value] of Object.entries(stats)) {
		if (value < 6) lowStats.push(stat);
		else if (value > 17) highStats.push(stat);
	}

	// add low stats if any
	for (const stat of lowStats) {
		const key = `low${stat}`;
		if (Array.isArray(source[key])) {
			result.push(...source[key]);
		}
	}

	// add high stats
	for (const stat of highStats) {
		const key = `high${stat}`;
		if (Array.isArray(source[key])) {
			result.push(...source[key]);
		}
	}

	// if there's literally nothing
	if (result.length === 0 && source.midAvg) {
		result.push(...source.midAvg);
	}

	// console.log("Using source keys:", Object.keys(source));
	// console.log("Low stats:", lowStats);
	// console.log("High stats:", highStats);
	// for (const stat of lowStats) {
	// 	const key = `low${stat}`;
	// 	console.log(`Adding sentences for key: ${key}`, source[key]);
	// }

	return result;
}
