"use client";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
	stats: Record<string, number>;
};

export default function CopyStatsButton({ stats }: Props) {
	const [copied, setCopied] = useState(false);

	// grabbing modifier for each skill
	const getMod = (score: number) => {
		const mod = Math.floor((score - 10) / 2);
		return mod >= 0 ? `+${mod}` : `${mod}`;
	};

	// used to get the stuff on the clipboard
	const handleCopy = async () => {
		const lines: string[] = [];

		lines.push("BASIC STATS");
		// assigning mod to each stat
		for (const stat of ["STR", "DEX", "CHA", "INT", "WIS", "CON"]) {
			const val = stats[stat] ?? 0;
			lines.push(`${stat} ${val} (${getMod(val)})`);
		}

		// setting up abilities
		lines.push("\nABILITY CHECKS:");
		const checks: [string, string][] = [
			["Acrobatics", "DEX"],
			["Animal Handling", "WIS"],
			["Arcana", "INT"],
			["Athletics", "STR"],
			["Deception", "CHA"],
			["History", "INT"],
			["Insight", "WIS"],
			["Intimidation", "CHA"],
			["Investigation", "INT"],
			["Medicine", "WIS"],
			["Nature", "INT"],
			["Perception", "WIS"],
			["Performance", "CHA"],
			["Persuasion", "CHA"],
			["Religion", "INT"],
			["Sleight of Hand", "DEX"],
			["Stealth", "DEX"],
			["Survival", "WIS"],
		];

		// actually going through each skill, giving it the modifier. if undefined, its 0
		for (const [skill, base] of checks) {
			const val = stats[base] ?? 0;
			lines.push(`${skill} (${base}): ${getMod(val)}`);
		}

		// actually doing it with the lines we have
		try {
			await navigator.clipboard.writeText(lines.join("\n"));
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy stats: ", err);
		}
	};

	return (
		<motion.button
			onClick={handleCopy}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			className={`b px-4 py-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] transition-all duration-200 ${
				copied ? "hover:green-700" : ""
			}`}
		>
			<span className="inline-block w-[100px] text-center">
				{copied ? "Copied!" : "Copy Stats"}
			</span>
		</motion.button>
	);
}
