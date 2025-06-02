"use client";
import { useState } from "react";
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

	const handleStatClick = (stat: string) => {
		setSelectedStat(stat);

		// when number not selected, then assign it
		if (selectedIndex !== null) {
			assign(stat, selectedIndex);
			setSelectedIndex(null);
		}
	};

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

	const assign = (stat: string, idx: number) => {
		const updated: Record<string, number | null> = { ...assignments }; // assign number of the index to a stat

		// remove this index from any stat that currently has it. just match by the idx name
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

	return (
		<div className="flex flex-col items-center gap-6">
			{/* info button */}
			<div className="group relative ml-auto mt-1">
				<div className="w-5 h-5 bg-gray-300 text-black text-xs rounded-full flex items-center justify-center cursor-default">
					?
				</div>
				<div className="absolute top-1/2 left-full -translate-y-1/2 ml-3 w-48 bg-black text-white text-xs p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
					{explanation}
				</div>
			</div>

			{/* Text animation */}
			<TextAnimation loopSentences={setArrayRamble} fadeTrue={false} />

			{/* Stat buttons */}
			<div className="flex gap-6 text-2xl font-bold">
				{statNames.map((stat) => {
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
						>
							{stat}
						</button>
					);
				})}
			</div>

			{/* numbers buttons */}
			<div className="flex gap-6 select-none text-4xl mt-4">
				{statValues.map((num, idx) => {
					const assignedStat = Object.entries(assignments).find(
						([, assignedIdx]) => assignedIdx === idx,
					)?.[0];
					const isSelected = selectedIndex === idx;

					// provide the pulse effect
					// const ringAnimation =
					// 	assignedStat || isSelected ? "animate-pulse" : "";

					// to provide that specific color
					const textColor = assignedStat
						? statColors[assignedStat]
						: isSelected
							? "text-white "
							: "text-gray-300";

					// for that ring aura glow
					const ringColor = assignedStat
						? statColors[assignedStat].replace("text-", "ring-") // store color, remove the tailwind syntax
						: isSelected
							? "ring-white/30"
							: "";

					return (
						<motion.button // intro animation haha
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
							className={`px-4 py-2 rounded transition transform hover:scale-105 ${textColor} ${
								assignedStat || isSelected
									? ` border-none ${ringColor} [text-shadow:_0_0_6px]`
									: "opacity-60 hover:opacity-100"
							}`}
						>
							{num}
						</motion.button>
					);
				})}
			</div>

			{/* Assigned Debug Output */}
			{/* <div className="text-sm mt-4 text-gray-300">
				Assigned:{" "}
				{JSON.stringify(
					Object.fromEntries(
						statNames.map((stat) => [
							stat,
							// biome-ignore lint/style/noNonNullAssertion: <explanation>
							assignments[stat] !== null ? statValues[assignments[stat]!] : "-",
						]),
					),
				)}
			</div> */}

			{/* Submit */}
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				disabled={!canSubmit}
				onClick={() => {
					const resolved: Record<string, number> = {};
					// check for null again because biome is a crybaby
					for (const stat of statNames) {
						const idx = assignments[stat];
						if (idx === null) return; // extra safety for null plus avoid stupid biome. But I guess it ain't wrong about null
						resolved[stat] = statValues[idx];
					}
					onComplete(resolved);
				}}
				className="mt-4 px-6 py-2 rounded bg-green-600 text-white disabled:opacity-50 hover:bg-green-700"
			>
				Lock In Stats
			</button>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={() => {
					setAssignments(
						Object.fromEntries(statNames.map((stat) => [stat, null])),
					);
					setSelectedStat(null);
					setSelectedIndex(null);
				}}
				className="mt-2 px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
			>
				Clear Choices
			</button>
		</div>
	);
}
