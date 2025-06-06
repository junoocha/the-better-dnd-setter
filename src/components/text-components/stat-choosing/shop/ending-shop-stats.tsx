import TextAnimation from "@/components/text-animation/text-animation";
import { motion } from "framer-motion";
import { shopKeeperResults } from "../../sentence-arrays/shop-text-data";

type EndingShopTextProps = {
	finalSums: number[];
	onComplete: () => void;
};

export default function EndingShopText({
	onComplete,
	finalSums,
}: EndingShopTextProps) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={shopKeeperResults}
				fadeTrue={false}
				numSentences={1}
				showAndStay={true}
			/>

			<motion.div
				key="showing-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3 min-h-[4.5rem] overflow-hidden"
			>
				<h1 className="flex gap-20 text-5xl font-bold select-none text-green-400 relative">
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
				className="px-6 py-3 mt-4 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				Continue
			</motion.button>
		</div>
	);
}
