import { useEffect, useState } from "react";

type DiceProps = {
	onRollComplete?: (value: number) => void;
	rollDelay?: number;
	switchInterval?: number;
};

export default function Dice({
	onRollComplete,
	rollDelay = 1000, // for how long it rolls
	switchInterval = 100, // speed of switchining faces
}: DiceProps) {
	const [value, setValue] = useState<number>(1);
	const [isRolling, setIsRolling] = useState(true);

	// to switch faces animation and determining the actual roll value
	useEffect(() => {
		const interval = setInterval(() => {
			// setInterval() is javascript function to run something repeatedly, given interval (switchInterval)
			// start animation
			setValue(Math.floor(Math.random() * 6) + 1); // need + 1 because there's no 0 side dice
		}, switchInterval);

		const timeout = setTimeout(() => {
			// stop animation
			clearInterval(interval);
			const final = Math.floor(Math.random() * 6) + 1; // final number picked
			setValue(final);
			setIsRolling(false);
			if (onRollComplete) onRollComplete(final);
		}, rollDelay);

		return () => {
			// cleanup
			clearInterval(interval);
			clearTimeout(timeout);
		};
	}, [rollDelay, switchInterval, onRollComplete]);

	return (
		// per dice image (just 1 shown, size dictated here)
		<div className="w-8 h-8 sm:w-10 sm:h-10">
			<img
				src={`/dice/${value}.png`} // show dice image
				alt={`Dice showing ${value}`}
				className="w-full h-full"
			/>
		</div>
	);
}
