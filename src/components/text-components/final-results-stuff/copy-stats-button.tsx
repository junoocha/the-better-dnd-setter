"use client";

type Props = {
	stats: Record<string, number>;
};

export default function CopyStatsButton({ stats }: Props) {
	const getMod = (score: number) => {
		const mod = Math.floor((score - 10) / 2);
		return mod >= 0 ? `+${mod}` : `${mod}`;
	};

	const handleCopy = () => {
		const lines: string[] = [];

		lines.push("BASIC STATS");
		for (const stat of ["STR", "DEX", "CHA", "INT", "WIS", "CON"]) {
			const val = stats[stat] ?? 0;
			lines.push(`${stat} ${val} (${getMod(val)})`);
		}

		lines.push("\nABILITY CHECKS:");
		const checks: [string, string][] = [
			["Acrobatics", "DEX"],
			["Animal Handling", "WIS"],
			["Arcana", "INT"],
			["Athletics", "STR"],
			["Deception", "CHR"],
			["History", "INT"],
			["Insight", "WIS"],
			["Intimidation", "CHR"],
			["Investigation", "INT"],
			["Medicine", "WIS"],
			["Nature", "INT"],
			["Perception", "WIS"],
			["Performance", "CHR"],
			["Persuasion", "CHR"],
			["Religion", "INT"],
			["Sleight of Hand", "DEX"],
			["Stealth", "DEX"],
			["Survival", "WIS"],
		];

		for (const [skill, base] of checks) {
			const val = stats[base] ?? 0;
			lines.push(`${skill} (${base}): ${getMod(val)}`);
		}

		const text = lines.join("\n");

		navigator.clipboard.writeText(text).catch((err) => {
			console.error("Failed to copy stats: ", err);
		});
	};

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={handleCopy}
			className="bg-yellow-500 text-white hover:bg-yellow-600"
		>
			Copy Stats
		</button>
	);
}
