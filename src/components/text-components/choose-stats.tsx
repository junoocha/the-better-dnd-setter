import { useState } from "react";
import TextAnimation from "../text-animation/text-animation";

type Props = {
	onComplete: () => void;
};

const descriptions = {
	gamble: ["You roll the dice... anything can happen."],
	boring: ["Standard stats: safe, predictable, dull."],
	shop: ["Spend wisely. Your journey starts with gear."],
};

export default function ChooseStats({ onComplete }: Props) {
	const [selectedOption, setSelectedOption] = useState<
		null | keyof typeof descriptions
	>(null);

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			{selectedOption && (
				<TextAnimation
					key={selectedOption} // forces remount
					initialSentences={descriptions[selectedOption]}
					fadeTrue={false}
					numSentences={1}
				/>
			)}
			<div className="flex flex-row gap-2">
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => setSelectedOption("gamble")}
					className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
				>
					GAMBLE
				</button>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => setSelectedOption("boring")}
					className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
				>
					Boring Given Stats
				</button>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => setSelectedOption("shop")}
					className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
				>
					Les Go Shopping
				</button>
			</div>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onComplete}
				className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 mt-4"
			>
				Confirm
			</button>
		</div>
	);
}
