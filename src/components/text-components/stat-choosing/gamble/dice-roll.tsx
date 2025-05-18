import Dice from "./dice-components/dice";
import { useState } from "react";

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

	const handleRoll = () => {
		if (isRolling || currentRoll >= 6) return;

		setIsRolling(true); // begin rolls and store results temp
		const values: number[] = [];

		// let completed = 0;

		// // when all dice finish rolling
		// const checkComplete = () => {
		// 	completed++;
		// 	if (completed === used) {
		// 		// sort and discard the lowest N dice
		// 		const sorted = [...values].sort((a, b) => a - b);
		// 		const kept = sorted.slice(discarded); // remove `discarded` number of lowest
		// 		const sum = kept.reduce((acc, val) => acc + val, 0); // add up values

		// 		// update state
		// 		setRollResults((prev) => [...prev, values]); //append to lists
		// 		setFinalSums((prev) => [...prev, sum]);
		// 		setCurrentRoll((prev) => prev + 1);
		// 		setIsRolling(false);

		// 		if (currentRoll + 1 === 6) {
		// 			onComplete([...finalSums, sum]); // include last sum
		// 		}
		// 	}
		// };

		for (let i = 0; i < used; i++) {
			values.push(0); // placeholder - array of 0s
		}

		// update values as each dice completes
		setRollResults((prev) => [...prev, []]);

		// values.forEach((_, i) => {
		// 	// simulate dice roll completion
		// 	// we'll dynamically render the dice with their onRollComplete to do this visually
		// });
	};

	return (
		<div className="flex flex-col gap-4 items-center text-center">
			<h2 className="text-xl text-white">Roll #{currentRoll + 1} of 6</h2>

			{/* Show Dice */}
			<div className="flex gap-2 flex-wrap justify-center min-h-[60px]">
				{isRolling &&
					Array.from({ length: used }).map((_, i) => (
						<Dice
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							onRollComplete={(val) => {
								rollResults[currentRoll][i] = val;
								if (rollResults[currentRoll].filter(Boolean).length === used) {
									const sorted = [...rollResults[currentRoll]].sort(
										(a, b) => a - b,
									);
									const kept = sorted.slice(discarded);
									const sum = kept.reduce((a, b) => a + b, 0);
									setFinalSums((prev) => [...prev, sum]);
									setCurrentRoll((prev) => prev + 1);
									setIsRolling(false);

									if (currentRoll + 1 === 6) {
										setTimeout(() => {
											onComplete([...finalSums, sum]);
										}, 1500); // half-second pause before transition
									}
								}
							}}
						/>
					))}

				{!isRolling && (
					// biome-ignore lint/a11y/useButtonType: <explanation>
					<button
						onClick={handleRoll}
						disabled={isRolling || currentRoll >= 6}
						className="mt-4 px-6 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
					>
						Roll Dice
					</button>
				)}
			</div>

			{/* Show Results So Far */}
			<div className="text-whitew-full max-w-md">
				<h3 className="text-lg mt-4 pb-4">Results So Far:</h3>
				<div className="flex flex-col justify-between items-center text-center h-[200px] w-full max-w-2xl mx-auto">
					<ul className="space-y-4">
						{rollResults.map((diceValues, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<li key={i}>
								<div className="flex justify-center items-center gap-4">
									<span className="font-mono text-sm  w-24 text-right">
										{i === 5 ? "Final Roll" : `Roll #${i + 1}`}:
									</span>
									<div className="flex gap-1 items-center">
										{(() => {
											// Pair each value with its original index
											const indexed = diceValues.map((val, idx) => ({
												val,
												idx,
											}));
											// Sort to find which indices should be discarded
											const sorted = [...indexed].sort((a, b) => a.val - b.val);
											const discardedIndices = sorted
												.slice(0, discarded)
												.map((item) => item.idx); // get indices of discarded dice

											return diceValues.map((val, idx) => {
												const isDiscarded = discardedIndices.includes(idx);
												const imageSrc = isDiscarded
													? `/dice/${val}-remove.png`
													: `/dice/${val}.png`;

												return (
													<img
														// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
