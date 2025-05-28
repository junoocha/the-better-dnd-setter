"use client";
import { useState } from "react";

const statNames = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
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
	const [selectedStat, setSelectedStat] = useState<string | null>(null);
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [assignments, setAssignments] = useState<Record<string, number | null>>(
		Object.fromEntries(statNames.map((stat) => [stat, null])),
	);

	const handleStatClick = (stat: string) => {
		setSelectedStat(stat);
		if (selectedIndex !== null) {
			assign(stat, selectedIndex);
			setSelectedIndex(null);
		}
	};

	const handleNumberClick = (idx: number) => {
		if (selectedStat) {
			assign(selectedStat, idx);
			setSelectedIndex(null);
		} else {
			setSelectedIndex(idx);
		}
	};

	const assign = (stat: string, idx: number) => {
		const updated: Record<string, number | null> = { ...assignments };
		// Remove this index from any stat that currently has it
		for (const key of statNames) {
			if (updated[key] === idx) {
				updated[key] = null;
			}
		}
		updated[stat] = idx;
		setAssignments(updated);
	};

	const canSubmit = Object.values(assignments).every((val) => val !== null);

	return (
		<div className="flex flex-col items-center gap-6">
			{/* Stat Names */}
			<div className="flex gap-6 text-2xl font-bold">
				{statNames.map((stat) => {
					const isAssigned = assignments[stat] !== null;
					const isSelected = selectedStat === stat;
					return (
						// biome-ignore lint/a11y/useButtonType: <explanation>
						<button
							key={`stat-${stat}`}
							onClick={() => handleStatClick(stat)}
							className={`px-4 py-2 rounded transition font-bold ${statColors[stat]} ${
								isSelected
									? "shadow-[0_0_10px] [text-shadow:_0_0_6px]"
									: isAssigned
										? "[text-shadow:_0_0_6px]"
										: "opacity-80 hover:opacity-100"
							}`}
						>
							{stat}
						</button>
					);
				})}
			</div>

			{/* Numbers */}
			<div className="flex gap-6 text-4xl mt-4">
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
						// biome-ignore lint/a11y/useButtonType: <explanation>
						<button
							key={`value-${idx}`}
							onClick={() => handleNumberClick(idx)}
							className={`px-4 py-2 rounded transition transform hover:scale-105 ${textColor} ${
								assignedStat || isSelected
									? `ring-4 ${ringColor} shadow-[0_0_12px] [text-shadow:_0_0_6px]`
									: "opacity-60 hover:opacity-100"
							}`}
						>
							{num}
						</button>
					);
				})}
			</div>

			{/* Assigned Debug Output */}
			<div className="text-sm mt-4 text-gray-300">
				Assigned:{" "}
				{JSON.stringify(
					Object.fromEntries(
						statNames.map((stat) => [
							stat,
							assignments[stat] !== null ? statValues[assignments[stat]!] : "-",
						]),
					),
				)}
			</div>

			{/* Submit */}
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				disabled={!canSubmit}
				onClick={() => {
					const resolved = Object.fromEntries(
						statNames.map((stat) => [stat, statValues[assignments[stat]!]]),
					);
					onComplete(resolved);
				}}
				className="mt-4 px-6 py-2 rounded bg-green-600 text-white disabled:opacity-50 hover:bg-green-700"
			>
				Lock In Stats
			</button>
		</div>
	);
}
