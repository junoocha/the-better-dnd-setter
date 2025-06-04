import Dice from "./dice-components/dice";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// if i don't get bored, maybe look into refactoring how dice are displayed, i do it like 3 times, maybe turn it into a component in the future but im lazy since its fine, but
// if i need cleaner code, yea do the thing on top

type RollDiceProps = {
	used: number;
	discarded: number;
	onComplete: (finalSums: number[]) => void;
};

export default function RollDice({
	used,
	discarded,
	onComplete,
}: RollDiceProps) {
	const [currentRoll, setCurrentRoll] = useState(0);
	const [rollResults, setRollResults] = useState<number[][]>([]); // storing all results in one array, so an array of arrays
	const [isRolling, setIsRolling] = useState(false);
	const [finalSums, setFinalSums] = useState<number[]>([]);
	const [justRolled, setJustRolled] = useState<number[] | null>(null);

	const handleRoll = () => {
		if (isRolling || currentRoll >= 6) return; // prevent roll

		setIsRolling(true); // begin rolls and store results temp
		const values: number[] = [];

		// prepare empty array for the new roll results
		setRollResults((prev) => [...prev, Array(used).fill(0)]);
	};

	// called when single dice finishes rolling. Index and value of dice
	const onDiceRollComplete = (val: number, idx: number) => {
		if (!rollResults[currentRoll]) return;

		// update the dice value for the current roll and dice index
		const newResults = [...rollResults];
		newResults[currentRoll][idx] = val;
		setRollResults(newResults);

		// Check if all dice finished rolling
		if (newResults[currentRoll].filter(Boolean).length === used) {
			// sort and discard lowest values
			const sorted = [...newResults[currentRoll]].sort((a, b) => a - b);
			const kept = sorted.slice(discarded);
			const sum = kept.reduce((a, b) => a + b, 0);

			setFinalSums((prev) => [...prev, sum]);
			setIsRolling(false);
			setJustRolled(newResults[currentRoll]);

			const isLastRoll = currentRoll + 1 === 6;
			// after showing results for 1.5s, move to next roll & clear justRolled for new roll
			setTimeout(
				() => {
					setJustRolled(null);
					setCurrentRoll((prev) => prev + 1);

					// if last roll, trigger onComplete callback
					if (currentRoll + 1 === 6) {
						onComplete([...finalSums, sum]);
					}
				},
				isLastRoll ? 3000 : 1500,
			);
		}
	};

	return (
		<div className="flex flex-col gap-4 items-center text-center">
			<h2 className="text-4xl text-white">
				{currentRoll === 6 ? "" : `Roll #${currentRoll + 1} of 6`}
			</h2>

			{/* show dice rolling + just rolled results */}
			<div className="flex gap-2 flex-wrap justify-center min-h-[60px]">
				<AnimatePresence mode="wait">
					{/* animation for while rolling */}
					{isRolling ? (
						<motion.div
							key="rolling"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="flex gap-2 pt-3 flex-wrap justify-center"
						>
							{Array.from({ length: used }).map((_, i) => (
								<Dice
									key={`dice-roll${i}`}
									onRollComplete={(val) => onDiceRollComplete(val, i)}
								/>
							))}
						</motion.div>
					) : justRolled ? ( // animation for after its rolled
						<motion.div
							key="justRolled"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}
							className="flex gap-2 pt-3 flex-wrap justify-center"
						>
							{(() => {
								const indexed = justRolled.map((val, idx) => ({ val, idx })); // same discard method
								const sorted = [...indexed].sort((a, b) => a.val - b.val);
								const discardedIndices = sorted
									.slice(0, discarded)
									.map((item) => item.idx);

								return justRolled.map((val, idx) => {
									// returning the dice image for each value, using the value as name
									const isDiscarded = discardedIndices.includes(idx);
									const imageSrc = isDiscarded
										? `/dice/${val}-remove.png`
										: `/dice/${val}.png`;

									return (
										<motion.img
											key={idx}
											src={imageSrc}
											alt={`Dice showing ${val}${isDiscarded ? " (discarded)" : ""}`}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.4 }}
											className={`w-10 h-10 ${isDiscarded ? "opacity-50" : ""}`}
										/>
									);
								});
							})()}
						</motion.div>
					) : (
						<motion.button // roll and also animation for the button
							key="roll-button"
							onClick={handleRoll}
							disabled={isRolling || currentRoll >= 6}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className="px-5 py-2 rounded-sm text-white text-xl bg-black border-[3px] border-white shadow-[0_0_0_1px_black] hover:shadow-[0_0_0_1px_black,0_0_0_2px_white]"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
						>
							Roll Dice
						</motion.button>
					)}
				</AnimatePresence>
			</div>

			{/* show Results So Far */}
			<div className="text-whitew-full max-w-md">
				<h3 className="text-2xl mt-4 pb-4">Results So Far:</h3>
				<div className="flex flex-col justify-between items-center text-center h-[200px] w-full max-w-2xl mx-auto">
					<ul className="space-y-4">
						{rollResults.map((diceValues, i) => {
							// don't render if final sum hasn't been computed yet
							if (finalSums[i] === undefined) return null;

							return (
								<motion.li
									key={i}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{
										delay: currentRoll === 6 ? 1.5 : 0.8,
										duration: 0.5,
									}}
								>
									<div className="flex justify-center items-center gap-4">
										{/* text to label each roll */}
										<span className="font-spectral text-lg w-24 text-right">
											{`Roll #${i + 1}`}:
										</span>

										{/* same logic to determine which dice to show based off of value */}
										<div className="flex gap-1 items-center">
											{(() => {
												const indexed = diceValues.map((val, idx) => ({
													val,
													idx,
												}));
												const sorted = [...indexed].sort(
													(a, b) => a.val - b.val,
												);
												const discardedIndices = sorted
													.slice(0, discarded)
													.map((item) => item.idx);

												return diceValues.map((val, idx) => {
													const isDiscarded = discardedIndices.includes(idx);
													const imageSrc = isDiscarded
														? `/dice/${val}-remove.png`
														: `/dice/${val}.png`;

													if (isDiscarded) {
														return (
															<AnimatePresence key={idx}>
																<motion.img
																	key={idx}
																	src={imageSrc}
																	alt={`Dice showing ${val} (discarded)`}
																	initial={{ opacity: 1 }}
																	animate={{ opacity: 0.5 }} // just dim it
																	transition={{ duration: 0.5, delay: 0.5 }}
																	className="w-6 h-6"
																/>
															</AnimatePresence>
														);
													}

													return (
														<img
															key={idx}
															src={imageSrc}
															alt={`Dice showing ${val}${isDiscarded ? " (discarded)" : ""}`}
															className="w-6 h-6"
														/>
													);
												});
											})()}
										</div>

										<span className="ml-2 font-bold text-green-400 w-10 text-left">
											{finalSums[i]}
										</span>
									</div>
								</motion.li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
