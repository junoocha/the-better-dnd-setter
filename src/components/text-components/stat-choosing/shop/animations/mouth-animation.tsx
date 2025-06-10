"use client";

import { useEffect, useState } from "react";

// constant frames for idle and blink frames
const MOUTH_FRAMES = [
	"mouth-1.png",
	"mouth-2.png",
	"mouth-3.png",
	"mouth-4.png",
];

const MouthAnimation = () => {
	const [currentFrame, setCurrentFrame] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timeout = setTimeout(() => {
			setCurrentFrame((prev) => (prev + 1) % MOUTH_FRAMES.length);
		}, 200); // frame speed in ms

		return () => clearTimeout(timeout); // cleanup on frame change or unmount
	}, [currentFrame]);

	const imageSrc = MOUTH_FRAMES[currentFrame];

	return (
		<div className="mx-auto">
			<img
				src={`/mouth/${imageSrc}`}
				alt="Animated Mouth"
				className="w-[150px] h-[40px] sm:w-[270px] sm:h-[80px]"
			/>
		</div>
	);
};

export default MouthAnimation;
