import { useState } from "react";
import TextAnimation from "../text-animation/text-animation";
import {
	standardArrayInfo,
	gambleInfo,
	shopInfo,
	defaultInfo,
} from "./sentence-arrays/choose-stats-data";
import { motion } from "framer-motion";

type Props = {
	onComplete: (selection: keyof typeof descriptions) => void;
};

const descriptions = {
	default: ["Paths diverge... decide your fate now."],
	gamble: ["Luck is a wild card... roll your destiny."],
	boring: ["Steady and plain... comfort in the known."],
	shop: ["Invest wisely... every point counts."],
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
			<div className="relative w-full max-w-md flex justify-center">
				<div className="">
					{selectedOption && (
						<TextAnimation
							key={selectedOption} // forces remount
							initialSentences={descriptions[selectedOption]}
							fadeTrue={false}
							numSentences={1}
							showAndStay={true}
						/>
					)}
				</div>

				{/* tooltip  positioned outside flex layout */}
				<div className="group absolute top-1/2 left-full -translate-y-1/2 ml-2 flex items-center">
					{/* tooltip trigger */}
					<div className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-default">
						?
					</div>

					{/* tooltip bubble */}
					<div className="ml-3 w-48 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none group-hover:pointer-events-auto whitespace-normal">
						{selectedOption === "gamble"
							? gambleInfo
							: selectedOption === "boring"
								? standardArrayInfo
								: selectedOption === "shop"
									? shopInfo
									: defaultInfo}
					</div>
				</div>
			</div>

			<div className="flex flex-row gap-2">
				<motion.button
					onClick={() => handleSelect("gamble")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`px-4 py-2 w-30 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] ${selectedOption === "gamble" ? "animate-bounce" : "border-transparent"}`}
				>
					Roll
				</motion.button>

				<motion.button
					onClick={() => handleSelect("boring")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`px-4 py-2 w-30 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] ${selectedOption === "boring" ? "animate-bounce" : "border-transparent"}`}
				>
					Standard
				</motion.button>

				<motion.button
					onClick={() => handleSelect("shop")}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className={`px-4 py-2 w-30 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]  ${selectedOption === "shop" ? "animate-bounce" : "border-transparent"}`}
				>
					Shop
				</motion.button>
			</div>

			<motion.button
				disabled={selectedOption === "default"}
				onClick={() => onComplete(selectedOption)}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				animate={{
					opacity: selectedOption !== "default" ? 1 : 0.3,
					boxShadow:
						selectedOption !== "default"
							? "0 0 15px 4px rgba(34,197,94,0.7)"
							: "",
				}}
				className="px-4 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] mt-4"
			>
				Confirm
			</motion.button>
		</div>
	);
}
