import TextAnimation from "@/components/text-animation/text-animation";
import { explanationGambleText } from "../../sentence-arrays/gamble-text-data";
import { useState } from "react";
import Dice from "./dice-components/dice";

type Props = {
	onComplete: (dieInfo: { used: number; discarded: number }) => void; // return values
	onBack: () => void;
};

export default function ChooseDice({ onComplete, onBack }: Props) {
	const [diceUsed, setDiceUsed] = useState("");
	const [diceDiscarded, setDiceDiscarded] = useState("");

	// convert string state values into numbers + check if valid number
	const handleSubmit = () => {
		const used = Number.parseInt(diceUsed);
		const discarded = Number.parseInt(diceDiscarded);
		if (!Number.isNaN(used) && !Number.isNaN(discarded)) {
			onComplete({ used, discarded });
		}
	};

	// conditionals for submit button
	const submitDisabled =
		!diceUsed ||
		!diceDiscarded ||
		Number.parseInt(diceDiscarded) >= Number.parseInt(diceUsed) ||
		Number.parseInt(diceUsed) - Number.parseInt(diceDiscarded) > 4;

	let validationMessage = "";
	if (Number.parseInt(diceDiscarded) >= Number.parseInt(diceUsed)) {
		validationMessage = "Are you dumb? You tryna roll with 0 or negative dice?";
	} else if (Number.parseInt(diceUsed) - Number.parseInt(diceDiscarded) > 4) {
		validationMessage =
			"Now that's real lame of you, rolling an insane amount of dice";
	}

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={explanationGambleText}
				fadeTrue={false}
				numSentences={1}
				// onLoopStart={() => {
				// 	// Delay so the first loop sentence has time to show before moving on
				// 	setTimeout(onComplete, 2500); // tweak this number to match timing
				// }}
			/>
			<div className="flex gap-4">
				{/* dropdown menu for dice number */}
				<select
					className="bg-gray-800 text-white px-4 py-2 rounded"
					value={diceUsed}
					onChange={(e) => setDiceUsed(e.target.value)}
				>
					<option value="" disabled>
						Dice to Roll
					</option>

					{[1, 2, 3, 4, 5, 6].map((n) => (
						<option key={n} value={n}>
							{n === 4 ? "4 (standard)" : n}
						</option>
					))}
				</select>

				{/* dropdown menu for dice to discard */}
				<select
					className="bg-gray-800 text-white px-4 py-2 rounded"
					value={diceDiscarded}
					onChange={(e) => setDiceDiscarded(e.target.value)}
				>
					<option value="" disabled>
						Dice to Discard
					</option>

					{[0, 1, 2, 3, 4, 5].map((n) => (
						<option key={n} value={n}>
							{n === 1 ? "1 (standard)" : n}
						</option>
					))}
				</select>
			</div>

			{submitDisabled && validationMessage && (
				<p className="text-red-400 text-sm italic">{validationMessage}</p>
			)}

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded text-white disabled:opacity-50"
				disabled={submitDisabled}
				onClick={handleSubmit}
			>
				Submit
			</button>

			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onBack}
				className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded text-white"
			>
				I Don't Want To Gamble
			</button>
			{/* <Dice onRollComplete={(num) => console.log("You rolled", num)} /> */}
		</div>
	);
}
