"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import TextAnimation from "../text-animation/text-animation";
import { explanation, setArrayRamble } from "./sentence-arrays/set-array-data";

const statNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

// object since its just static stuff
const statColors: Record<string, string> = {
	STR: "text-red-500",
	DEX: "text-green-500",
	CON: "text-yellow-500",
	INT: "text-blue-500",
	WIS: "text-purple-500",
	CHA: "text-pink-500",
};

type Props = {
	statValues: number[];
	onComplete: (assignment: Record<string, number>) => void;
};

export default function StatAssignment({ statValues, onComplete }: Props) {
	// current selected stat
	const [selectedStat, setSelectedStat] = useState<string | null>(null);

	// current index of the number
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	// tracking which number is assigned to which stat
	const [assignments, setAssignments] = useState<Record<string, number | null>>(
		Object.fromEntries(statNames.map((stat) => [stat, null])),
	);

	// tool tip stuff
	const [tooltipVisible, setTooltipVisible] = useState(false);
	const tooltipRef = useRef<HTMLDivElement>(null);

	// font size adjust for mobile. man i hate mobile
	const [fontSize, setFontSize] = useState(30);

	// for clicking on a stat
	const handleStatClick = (stat: string) => {
		setSelectedStat(stat);

		// when number not selected, then assign it
		if (selectedIndex !== null) {
			assign(stat, selectedIndex);
			setSelectedIndex(null);
		}
	};

	// for clicking on a number
	const handleNumberClick = (idx: number) => {
		// if stat is selected, assign number to the stat
		if (selectedStat) {
			assign(selectedStat, idx);
			setSelectedIndex(null);
		} else {
			// if not, just mark number as it is
			setSelectedIndex(idx);
		}
	};

	// assign number to stat
	const assign = (stat: string, idx: number) => {
		const updated: Record<string, number | null> = { ...assignments }; // update record/assignment

		// remove this index from any stat that currently has it. just match by the idx name. happens when user clicks on an assigned number
		for (const key of statNames) {
			if (updated[key] === idx) {
				updated[key] = null;
			}
		}

		// then just update.
		updated[stat] = idx;
		setAssignments(updated);
	};

	// the conditional for the confirm button, want all stats at least allocated
	const canSubmit = Object.values(assignments).every((val) => val !== null);

	// tooltip disappear when clicking outside
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

	// for updating font for mobile because tailwind css hates me
	useEffect(() => {
		const updateFontSize = () => {
			setFontSize(window.innerWidth <= 640 ? 25 : 30);
		};
		updateFontSize(); // initial
		window.addEventListener("resize", updateFontSize);
		return () => window.removeEventListener("resize", updateFontSize);
	}, []);

	return (
		<div className="w-full max-w-5xl mx-auto px-4 flex flex-col items-center gap-6 mt-6 mb-10 sm:mt-0 sm:mb-0">
			{/* info tool tip */}
			<div
				className="group relative self-end mt-1 sm:self-end sm:mt-1"
				ref={tooltipRef}
			>
				{/* the bubble */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-pointer select-none"
					onClick={() => setTooltipVisible((prev) => !prev)}
				>
					?
				</div>

				{/* the explanation */}
				<div
					className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 w-48 bg-black text-white text-xs p-2 rounded
								opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 z-10
								${tooltipVisible ? "opacity-100 pointer-events-auto" : ""}`}
				>
					{explanation}
				</div>
			</div>

			{/* text animation */}
			<div className="min-h-[4.5rem] overflow-hidden text-center">
				<TextAnimation loopSentences={setArrayRamble} fadeTrue={false} />
			</div>

			{/* main content layout */}
			<div className="flex flex-col sm:flex-col gap-6 w-full items-center">
				{/**/}

				{/* stat buttons */}
				<div className="flex flex-wrap justify-center gap-4 w-full max-w-[800px]">
					{statNames.map((stat) => {
						// constant to determine what is currently being selected and if a stat is assigned already
						const isAssigned = assignments[stat] !== null;
						const isSelected = selectedStat === stat;

						return (
							// biome-ignore lint/a11y/useButtonType: <explanation>
							<button
								key={`stat-${stat}`}
								onClick={() => handleStatClick(stat)}
								className={`px-4 py-2 rounded transition font-bold select-none ${isAssigned || isSelected ? statColors[stat] : "text-gray-400"} ${
									isSelected
										? "animate-[pulse_2s_ease-in-out_infinite] [text-shadow:_0_0_6px]"
										: isAssigned
											? "[text-shadow:_0_0_30px]"
											: "opacity-80 hover:opacity-100"
								}`}
								style={{ fontSize }}
							>
								{stat}
							</button>
						);
					})}
				</div>

				{/* number buttons */}
				<div className="grid grid-cols-3 sm:grid-cols-6 gap-4 select-none text-4xl mt-2 sm:mt-4">
					{statValues.map((num, idx) => {
						const assignedStat = Object.entries(assignments).find(
							([, assignedIdx]) => assignedIdx === idx,
						)?.[0];
						const isSelected = selectedIndex === idx;

						const textColor = assignedStat
							? statColors[assignedStat]
							: isSelected
								? "text-white"
								: "text-gray-300";

						const ringColor = assignedStat
							? statColors[assignedStat].replace("text-", "ring-")
							: isSelected
								? "ring-white/30"
								: "";

						return (
							<motion.button
								key={`value-${idx}`}
								initial={{ opacity: 0, y: 20, scale: 0.9 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{
									duration: 0.25,
									delay: idx * 0.05,
									type: "spring",
									stiffness: 200,
								}}
								onClick={() => handleNumberClick(idx)}
								className={`font-xl px-4 py-2 text-5xl rounded transition transform hover:scale-105 ${textColor} ${
									assignedStat || isSelected
										? ` border-none ${ringColor} [text-shadow:_0_0_6px]`
										: "opacity-60 hover:opacity-100"
								}`}
								style={{ fontSize: 37 }}
							>
								{num}
							</motion.button>
						);
					})}
				</div>
			</div>

			{/* submit button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				disabled={!canSubmit}
				onClick={() => {
					const resolved: Record<string, number> = {};
					for (const stat of statNames) {
						const idx = assignments[stat];
						if (idx === null) return;
						resolved[stat] = statValues[idx];
					}
					onComplete(resolved);
				}}
				animate={{
					opacity: !canSubmit ? 0.3 : 1,
					boxShadow: !canSubmit
						? "0 0 0px 0px rgba(0,0,0,0)"
						: "0 0 15px 4px rgba(34,197,94,0.7)",
				}}
				className="mt-4 px-6 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] disabled:opacity-50"
			>
				Lock In Stats
			</motion.button>

			{/* reset choice button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={() => {
					setAssignments(
						Object.fromEntries(statNames.map((stat) => [stat, null])),
					);
					setSelectedStat(null);
					setSelectedIndex(null);
				}}
				className="mt-2 px-5 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
			>
				Clear Choices
			</motion.button>
		</div>
	);
}
