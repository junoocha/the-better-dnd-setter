import TextAnimation from "@/components/text-animation/text-animation";
import { standardArraySentences } from "../sentence-arrays/standard-array-data";
import { motion } from "framer-motion";

type Props = {
	onComplete: () => void;
	onBack: () => void;
};

export default function StandardArrayText({ onComplete, onBack }: Props) {
	// will always be this, so its here lol
	const standardArray = [8, 10, 12, 13, 14, 15];

	return (
		<div className="flex flex-col gap-6 items-center text-center px-4 max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto">
			{/* what would you know, another text animation */}
			<TextAnimation
				loopSentences={standardArraySentences}
				fadeTrue={false}
				numSentences={1}
				showAndStay={true}
			/>

			{/* whole thing for showing stats */}
			<motion.div
				key="showing-final-results"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className="flex justify-center pt-3 "
			>
				<h1
					className="
					grid grid-cols-3 grid-rows-2 gap-x-10 gap-y-4
					sm:flex sm:gap-14 sm:px-6
					text-5xl font-bold select-none text-green-400
					relative min-h-[4.5rem] overflow-hidden"
				>
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

			{/* continue button */}
			<motion.button
				onClick={onComplete}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-8 py-3 rounded-sm mt-2 text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				Continue
			</motion.button>

			{/* go back button since someone might not like this no more */}
			<motion.button
				onClick={onBack}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-6 py-3 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				← Go Back
			</motion.button>
		</div>
	);
}
