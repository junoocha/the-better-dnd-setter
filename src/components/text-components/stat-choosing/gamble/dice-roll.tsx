import Dice from "./dice-components/dice";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
		if (isRolling || currentRoll >= 6) return;

		setIsRolling(true); // begin rolls and store results temp
		const values: number[] = [];

		// prepare empty array for the new roll results
		setRollResults((prev) => [...prev, Array(used).fill(0)]);
	};

	const onDiceRollComplete = (val: number, idx: number) => {
		if (!rollResults[currentRoll]) return;

		// Update the dice value for the current roll and dice index
		const newResults = [...rollResults];
		newResults[currentRoll][idx] = val;
		setRollResults(newResults);

		// Check if all dice finished rolling
		if (newResults[currentRoll].filter(Boolean).length === used) {
			const sorted = [...newResults[currentRoll]].sort((a, b) => a - b);
			const kept = sorted.slice(discarded);
			const sum = kept.reduce((a, b) => a + b, 0);

			setFinalSums((prev) => [...prev, sum]);
			setIsRolling(false);
			setJustRolled(newResults[currentRoll]);

			// After showing results for 1.5s, move to next roll & clear justRolled
			setTimeout(() => {
				setJustRolled(null);
				setCurrentRoll((prev) => prev + 1);

				// If last roll, trigger onComplete callback
				if (currentRoll + 1 === 6) {
					onComplete([...finalSums, sum]);
				}
			}, 1500);
		}
	};

	return (
		<div className="flex flex-col gap-4 items-center text-center">
			<h2 className="text-xl text-white">
				{currentRoll === 6 ? "" : `Roll #${currentRoll + 1} of 6`}
			</h2>

			{/* Show Dice Rolling or Just Rolled results */}
			<div className="flex gap-2 flex-wrap justify-center min-h-[60px]">
				<AnimatePresence mode="wait">
					{isRolling ? (
						<motion.div
							key="rolling"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.3 }}
							className="flex gap-2 flex-wrap justify-center"
						>
							{Array.from({ length: used }).map((_, i) => (
								<Dice
									key={i}
									onRollComplete={(val) => onDiceRollComplete(val, i)}
								/>
							))}
						</motion.div>
					) : justRolled ? (
						<motion.div
							key="justRolled"
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.5 }}
							className="flex gap-2 flex-wrap justify-center"
						>
							{(() => {
								const indexed = justRolled.map((val, idx) => ({ val, idx }));
								const sorted = [...indexed].sort((a, b) => a.val - b.val);
								const discardedIndices = sorted
									.slice(0, discarded)
									.map((item) => item.idx);

								return justRolled.map((val, idx) => {
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
						<motion.button
							key="roll-button"
							onClick={handleRoll}
							disabled={isRolling || currentRoll >= 6}
							className="mt-4 px-6 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
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

			{/* Show Results So Far */}
			<div className="text-whitew-full max-w-md">
				<h3 className="text-lg mt-4 pb-4">Results So Far:</h3>
				<div className="flex flex-col justify-between items-center text-center h-[200px] w-full max-w-2xl mx-auto">
					<ul className="space-y-4">
						<AnimatePresence mode="wait">
							{rollResults.map((diceValues, i) => {
								// Don't render if final sum hasn't been computed yet
								if (finalSums[i] === undefined) return null;

								return (
									<motion.li
										// biome-ignore lint/suspicious/noArrayIndexKey: using static list
										key={i}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}
										transition={{ delay: justRolled ? 0.8 : 0, duration: 0.5 }}
									>
										<div className="flex justify-center items-center gap-4">
											<span className="font-mono text-sm w-24 text-right">
												{`Roll #${i + 1}`}:
											</span>

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
																// biome-ignore lint/suspicious/noArrayIndexKey: using static list
																<AnimatePresence key={idx}>
																	<motion.img
																		// biome-ignore lint/suspicious/noArrayIndexKey: using static list
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
																// biome-ignore lint/suspicious/noArrayIndexKey: using static list
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
						</AnimatePresence>
					</ul>
				</div>
			</div>
		</div>
	);
}
