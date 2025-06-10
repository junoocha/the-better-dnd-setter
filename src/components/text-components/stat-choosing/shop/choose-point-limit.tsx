import TextAnimation from "@/components/text-animation/text-animation";
import { explanationPointLimitText } from "../../sentence-arrays/shop-text-data";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
	onComplete: (pointLimit: number) => void;
	onBack: () => void;
};

export default function ChoosePointLimit({ onComplete, onBack }: Props) {
	// point limit
	const [pointLimit, setPointLimit] = useState("27");

	// limit
	const numericLimit = Number.parseInt(pointLimit);

	// check if can submit
	const submitDisabled =
		!pointLimit || Number.isNaN(numericLimit) || numericLimit <= 0;

	const showWarning = numericLimit > 35;
	const showTooLow = numericLimit < 1;

	// to move on
	const handleSubmit = () => {
		if (!Number.isNaN(numericLimit) && numericLimit > 0 && numericLimit <= 35) {
			onComplete(numericLimit);
		}
	};

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={explanationPointLimitText}
				fadeTrue={false}
				numSentences={1}
				showAndStay={true}
			/>

			{/* enter number input */}
			<div className="flex gap-4">
				<input
					type="number"
					className="bg-gray-800 font-spectral text-xl text-white px-4 py-2 rounded w-32 text-center"
					value={pointLimit}
					onChange={(e) => setPointLimit(e.target.value)}
					placeholder="Enter Limit"
					min={1}
				/>
			</div>

			{/* warnings is too high */}
			{showWarning && (
				<p className="text-red-400 text-sm italic">
					Calm down bro, that number is way too high.
				</p>
			)}

			{/* warnings too low */}
			{showTooLow && (
				<p className="text-red-400 text-sm italic">Shopping with no money?</p>
			)}

			{/* the submit button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className=" transition px-12 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] disabled:opacity-50"
				disabled={submitDisabled || showWarning}
				onClick={handleSubmit}
				animate={{
					opacity: submitDisabled ? 0.3 : 1,
					boxShadow: submitDisabled
						? "0 0 0px 0px rgba(0,0,0,0)"
						: " 0 0 5px red, 0 0 15px violet", // red purple glow
				}}
			>
				Summon Jerry
			</motion.button>

			{/* go back option */}
			<motion.button
				whileHover={{
					scale: 1.05,
					boxShadow: "0 0 10px red",
				}}
				whileTap={{ scale: 0.95 }}
				onClick={onBack}
				className=" px-6 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				I Forgot My Wallet
			</motion.button>
		</div>
	);
}
