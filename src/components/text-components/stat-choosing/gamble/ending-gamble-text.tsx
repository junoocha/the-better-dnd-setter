import TextAnimation from "@/components/text-animation/text-animation";
import {
	badGambleText,
	goodGambleText,
	midGambleText,
	highSTDGambleText,
	duplicateGambleText,
} from "../../sentence-arrays/gamble-text-data";
import { motion } from "framer-motion";

type Props = {
	finalSums: number[];
	onComplete: () => void;
};

export default function EndingGambleText({ finalSums, onComplete }: Props) {
	const average =
		finalSums.reduce((sum, num) => sum + num, 0) / finalSums.length;

	// if every number is the same
	function duplicates(arr: number[]): boolean {
		const first = arr[0];
		return arr.every((v) => v === first);
	}

	// if the numbers are very far apart
	function isChaotic(arr: number[]): boolean {
		const variance =
			arr.reduce((sum, v) => sum + (v - average) ** 2, 0) / arr.length;
		const stdDev = Math.sqrt(variance);
		return stdDev > 4.5; // tweak this threshold as needed
	}

	// biome-ignore lint/suspicious/noImplicitAnyLet:
	let selectedSentences;
	if (isChaotic(finalSums)) {
		selectedSentences = highSTDGambleText;
	} else if (duplicates(finalSums)) {
		selectedSentences = duplicateGambleText;
	} else if (average > 12) {
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
				fadeTrue={false}
				numSentences={1}
				showAndStay={true}
			/>

			<motion.div
				key="showing-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3"
			>
				<h1 className="flex gap-20 select-none text-5xl font-bold text-green-400 relative">
					{finalSums.map((val, i) => (
						<motion.span
							key={`ending-g-${i}`}
							className="relative inline-block"
							initial={{ scale: 0.8, opacity: 0.7 }}
							animate={{
								scale: [1, 1.05, 1],
								rotate: [0, 3, -3, 0],
								transition: {
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
									duration: 2 + Math.random() * 2,
									delay: i * 0.2,
								},
							}}
						>
							{val}
						</motion.span>
					))}
				</h1>
			</motion.div>

			<motion.button
				onClick={onComplete}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-6 py-3 mt-4 bg-black text-white rounded hover:bg-blue-700"
			>
				Continue
			</motion.button>
		</div>
	);
}
