import TextAnimation from "@/components/text-animation/text-animation";
import {
	badGambleText,
	goodGambleText,
	midGambleText,
} from "../../sentence-arrays/gamble-text-data";
import { motion } from "framer-motion";

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

			<motion.div
				key="showing-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3"
			>
				<h1 className="flex gap-20 text-5xl font-bold text-green-400 relative">
					{finalSums.map((val, i) => (
						<motion.span
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							className="relative inline-block"
							initial={{ scale: 0.8, opacity: 0.7 }}
							animate={{
								scale: [1, 1.05, 1],
								rotate: [0, 2, -2, 0],
								transition: {
									repeat: Number.POSITIVE_INFINITY,
									repeatType: "loop",
									duration: 2 + Math.random() * 2,
									delay: i * 0.2,
								},
							}}
						>
							{/* The number */}
							<span className="drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
								{val}
							</span>

							{/* Sparkle */}
							<motion.span
								className="absolute top-0 left-1/2 w-3 h-3 bg-white rounded-full"
								initial={{ opacity: 0, scale: 0 }}
								animate={{
									opacity: [0.8, 0],
									scale: [0.5, 2],
								}}
								transition={{
									duration: 1,
									repeat: Number.POSITIVE_INFINITY,
									repeatDelay: 2 + i * 0.3,
								}}
							/>
						</motion.span>
					))}
				</h1>
			</motion.div>
		</div>
	);
}
