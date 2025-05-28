import TextAnimation from "@/components/text-animation/text-animation";
import { standardArraySentences } from "../sentence-arrays/standard-array-data";
import { motion } from "framer-motion";

type Props = {
	onComplete: () => void;
	onBack: () => void;
};

export default function StandardArrayText({ onComplete, onBack }: Props) {
	const standardArray = [8, 10, 12, 13, 14, 15];

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={standardArraySentences}
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
				<h1 className="flex gap-20 text-5xl font-bold text-green-400 relative">
					{standardArray.map((val, i) => (
						<motion.span
							key={`standard-${i}`}
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
				className="px-6 py-3 mt-2 bg-black text-white rounded hover:bg-blue-700"
			>
				Continue
			</motion.button>

			<motion.button
				onClick={onBack}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-6 py-3 bg-black text-white rounded hover:bg-blue-700"
			>
				← Go Back
			</motion.button>
		</div>
	);
}
