import TextAnimation from "@/components/text-animation/text-animation";
import {
	badGambleText,
	goodGambleText,
	midGambleText,
} from "../../sentence-arrays/gamble-text-data";

type Props = {
	finalSums: number[];
	onComplete: () => void;
};

export default function EndingGambleText({ finalSums, onComplete }: Props) {
	const average =
		finalSums.reduce((sum, num) => sum + num, 0) / finalSums.length;

	// biome-ignore lint/suspicious/noImplicitAnyLet:
	let selectedSentences;
	if (average > 12) {
		selectedSentences = goodGambleText;
	} else if (average >= 9) {
		selectedSentences = midGambleText;
	} else {
		selectedSentences = badGambleText;
	}

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={selectedSentences}
				fadeTrue={true}
				numSentences={1}
				onLoopStart={() => {
					// Delay so the first loop sentence has time to show before moving on
					setTimeout(onComplete, 2500); // tweak this number to match timing
				}}
			/>
		</div>
	);
}
