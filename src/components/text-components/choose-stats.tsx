import { useState, useRef, useEffect } from "react";
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
	shop: ["Invest your fortune wisely... every point counts."],
};

export default function ChooseStats({ onComplete }: Props) {
	// const [selectedOption, setSelectedOption] = useState<
	// 	null | keyof typeof descriptions
	// >(null);
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);
	const [selectedOption, setSelectedOption] =
		useState<keyof typeof descriptions>("default");

	const handleSelect = (option: keyof typeof descriptions) => {
		setSelectedOption((prev) => (prev === option ? "default" : option));
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				tooltipRef.current &&
				!tooltipRef.current.contains(event.target as Node)
			) {
				setTooltipVisible(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex flex-col gap-6 items-center text-center w-full px-4 -mt-15">
			{/* Container for tooltip + text */}
			<div className="w-full max-w-md relative flex flex-col gap-2 mx-auto">
				{/* Tooltip container with group */}
				<div
					ref={tooltipRef}
					className="group flex justify-end items-center space-x-2 mb-1"
					// 'space-x-2' adds gap between tooltip info and trigger
				>
					{/* Tooltip info text */}
					<div
						className={`w-48 bg-black text-white text-xs p-2 rounded whitespace-normal
							transition-opacity duration-300
							opacity-0 pointer-events-none
							group-hover:opacity-100 group-hover:pointer-events-auto
							${tooltipVisible ? "opacity-100 pointer-events-auto" : ""}`}
						style={{ order: 1 }} // keep this first so it appears to left of trigger
					>
						{selectedOption === "gamble"
							? gambleInfo
							: selectedOption === "boring"
								? standardArrayInfo
								: selectedOption === "shop"
									? shopInfo
									: defaultInfo}
					</div>

					{/* Tooltip trigger */}
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => setTooltipVisible((prev) => !prev)}
						className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-pointer select-none"
						style={{ order: 2 }} // keep trigger on right
					>
						?
					</div>
				</div>

				{/* Text Animation */}
				{selectedOption && (
					<TextAnimation
						key={selectedOption}
						initialSentences={descriptions[selectedOption]}
						fadeTrue={false}
						numSentences={1}
						showAndStay={true}
					/>
				)}
			</div>

			{/* buttons */}
			<div className="flex flex-wrap justify-center gap-2 w-full max-w-md">
				{(["gamble", "boring", "shop"] as const).map((option) => (
					<motion.button
						key={option}
						onClick={() => handleSelect(option)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						className={`px-4 py-2 w-28 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] ${
							selectedOption === option
								? "animate-bounce"
								: "border-transparent"
						}`}
					>
						{option === "gamble"
							? "Roll"
							: option === "boring"
								? "Standard"
								: "Shop"}
					</motion.button>
				))}
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
							: "0 0 0px 0px rgba(0,0,0,0)",
				}}
				style={{
					boxShadow: "0 0 0px 0px rgba(0,0,0,0)",
				}}
				className="px-4 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] mt-4"
			>
				Confirm
			</motion.button>
		</div>
	);
}
