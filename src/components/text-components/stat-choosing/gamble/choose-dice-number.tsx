import TextAnimation from "@/components/text-animation/text-animation";
import { explanationGambleText } from "../../sentence-arrays/gamble-text-data";
import { useState } from "react";
import Dice from "./dice-components/dice";
import { motion } from "framer-motion";

type Props = {
	onComplete: (dieInfo: { used: number; discarded: number }) => void; // return values
	onBack: () => void;
};

export default function ChooseDice({ onComplete, onBack }: Props) {
	// set the values
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
		<div className="flex flex-col gap-6 items-center text-center px-2 sm:px-0 max-w-xs sm:max-w-none mx-auto">
			{/* another text animation */}
			<TextAnimation
				initialSentences={explanationGambleText}
				fadeTrue={false}
				numSentences={1}
				showAndStay={true}
			/>

			{/* container for the dropdown menus */}
			<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none items-center justify-center">
				{/* dropdown menu for dice number */}
				<select
					className="bg-gray-800 font-spectral text-xl text-white px-4 py-2 rounded"
					value={diceUsed}
					onChange={(e) => setDiceUsed(e.target.value)}
					aria-label="Dice to Roll"
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
					className="bg-gray-800 font-spectral text-xl text-white px-4 py-2 rounded"
					value={diceDiscarded}
					onChange={(e) => setDiceDiscarded(e.target.value)}
					aria-label="Dice to Discard"
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

			{/* // error message when something illogical happens (e.g. rolling 0 dice or if user is rolling too many dice) */}
			{submitDisabled && validationMessage && (
				<p className="text-red-400 text-sm italic">{validationMessage}</p>
			)}

			{/* submit button */}
			<motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				className="px-25 py-2 mt-2 rounded-sm text-white bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white] disabled:opacity-50"
				disabled={submitDisabled}
				onClick={handleSubmit}
				animate={{
					opacity: submitDisabled ? 0.3 : 1,
					boxShadow: submitDisabled
						? "0 0 0px 0px rgba(0,0,0,0)"
						: "0 0 15px 4px rgba(34,197,94,0.7)", // green glow
				}}
			>
				Submit
			</motion.button>

			{/* go back option */}
			<motion.button
				whileHover={{
					scale: 1.05,
					boxShadow: "0 0 10px red",
				}}
				whileTap={{ scale: 0.95 }}
				onClick={onBack}
				className="rounded-sm text-white bg-black border-[3px] border-white  px-6 py-2 "
			>
				I Don't Want To Gamble
			</motion.button>
		</div>
	);
}
