import Dice from "./dice-components/dice";

type RollDiceProps = {
	used: number;
	discarded: number;
	onComplete: (results: number[]) => void;
};

export default function RollDice({
	used,
	discarded,
	onComplete,
}: RollDiceProps) {
	return (
		<div className="flex flex-col gap-4 items-center">
			<p className="text-lg text-white">
				Rolling {used} dice, discarding {discarded}...
			</p>
			<div className="flex gap-2">
				{Array.from({ length: used }).map((_, i) => (
					<Dice
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						onRollComplete={(val) => console.log(`Dice ${i + 1}:`, val)}
					/>
				))}
			</div>
			{/* Add logic later to collect results, discard, then call onComplete */}
		</div>
	);
}
