import TextAnimation from "@/components/text-animation/text-animation";
import { explanationPointLimitText } from "../../sentence-arrays/shop-text-data";
import { useState } from "react";

type Props = {
	onComplete: (pointLimit: number) => void;
	onBack: () => void;
};

export default function ChoosePointLimit({ onComplete, onBack }: Props) {
	const [pointLimit, setPointLimit] = useState("");

	const numericLimit = Number.parseInt(pointLimit);
	const submitDisabled =
		!pointLimit || Number.isNaN(numericLimit) || numericLimit <= 0;

	const showWarning = numericLimit > 35;

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
			/>

			<div className="flex gap-4">
				<input
					type="number"
					className="bg-gray-800 text-white px-4 py-2 rounded w-32 text-center"
					value={pointLimit}
					onChange={(e) => setPointLimit(e.target.value)}
					placeholder="Enter Limit"
					min={1}
				/>
			</div>

			{showWarning && (
				<p className="text-red-400 text-sm italic">
					Calm down bro, that number is way too high.
				</p>
			)}

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded text-white disabled:opacity-50"
				disabled={submitDisabled || showWarning}
				onClick={handleSubmit}
			>
				Submit
			</button>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onBack}
				className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
			>
				I Forgot My Wallet
			</button>
		</div>
	);
}
