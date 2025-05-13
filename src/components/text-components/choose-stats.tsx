import { useState } from "react";
import TextAnimation from "../text-animation/text-animation";

type Props = {
	onComplete: (selection: keyof typeof descriptions) => void;
};

const descriptions = {
	default: ["Choose the path you would like to do."],
	gamble: ["You roll the dice... anything can happen."],
	boring: ["Standard stats: safe, predictable, dull."],
	shop: ["Spend wisely. Your journey starts with gear."],
};

export default function ChooseStats({ onComplete }: Props) {
	// const [selectedOption, setSelectedOption] = useState<
	// 	null | keyof typeof descriptions
	// >(null);
	const [selectedOption, setSelectedOption] =
		useState<keyof typeof descriptions>("default");

	const handleSelect = (option: keyof typeof descriptions) => {
		setSelectedOption((prev) => (prev === option ? "default" : option));
	};
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
					onClick={() => handleSelect("gamble")}
					className={`px-4 py-2 w-30 bg-blue-600 rounded hover:bg-blue-700 ${selectedOption === "gamble" ? "animate-bounce" : "border-transparent"}`}
				>
					GAMBLE
				</button>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => handleSelect("boring")}
					className={`px-4 py-2 w-30 bg-blue-600 rounded hover:bg-blue-700 ${selectedOption === "boring" ? "animate-bounce" : "border-transparent"}`}
				>
					Given Stats
				</button>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button
					onClick={() => handleSelect("shop")}
					className={`px-4 py-2 w-30 bg-blue-600 rounded hover:bg-blue-700 ${selectedOption === "shop" ? "animate-bounce" : "border-bg-blue-600"}`}
				>
					Shop
				</button>
			</div>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				disabled={selectedOption === "default"}
				onClick={() => onComplete(selectedOption)}
				className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 mt-4"
			>
				Confirm
			</button>
		</div>
	);
}
