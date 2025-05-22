import { useState } from "react";
import TextAnimation from "../text-animation/text-animation";
import {
	standardArrayInfo,
	gambleInfo,
	shopInfo,
} from "./sentence-arrays/choose-stats-data";

type Props = {
	onComplete: (selection: keyof typeof descriptions) => void;
};

const descriptions = {
	default: ["Paths diverge... decide your fate now."],
	gamble: ["Luck is a wild card... roll your destiny."],
	boring: ["Steady and plain... comfort in the known."],
	shop: ["Invest your fortune wisely... every point counts."],
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
			{/* Text + Tooltip aligned side-by-side */}
			<div className="flex justify-between items-start w-full max-w-md">
				<div className="flex-1 ml-9 text-center margin">
					{selectedOption && (
						<TextAnimation
							key={selectedOption} // forces remount
							initialSentences={descriptions[selectedOption]}
							fadeTrue={false}
							numSentences={1}
						/>
					)}
				</div>

				{/* Tooltip bubble */}
				<div className="group relative ml-2 mt-1">
					<div className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-default">
						?
					</div>
					<div className="absolute top-1/2 left-full -translate-y-1/2 ml-3 w-48 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
						{selectedOption === "gamble"
							? gambleInfo
							: selectedOption === "boring"
								? standardArrayInfo
								: shopInfo}
					</div>
				</div>
			</div>

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
					Standard
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
