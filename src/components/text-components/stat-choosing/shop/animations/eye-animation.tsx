"use client";

import { useEffect, useState } from "react";

// constant frames for idle and blink frames
const IDLE_FRAMES = ["idle-1.png", "idle-2.png", "idle-3.png", "idle-4.png"];
const BLINK_FRAMES = ["blink-1.png", "blink-2.png", "blink-1.png"];

const EyeAnimation = () => {
	const [currentFrame, setCurrentFrame] = useState(0);
	const [isBlinking, setIsBlinking] = useState(false);
	const [blinkFrame, setBlinkFrame] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isBlinking) {
			// while blinking, go through the blink phase
			if (blinkFrame < BLINK_FRAMES.length) {
				timeout = setTimeout(() => {
					setBlinkFrame((prev) => prev + 1);
				}, 150); // blink frame speed
			} else {
				setIsBlinking(false);
				setBlinkFrame(0);
			}
		} else {
			// idle eye frames
			timeout = setTimeout(() => {
				setCurrentFrame((prev) => (prev + 1) % IDLE_FRAMES.length);
			}, 300); // idle frame speed

			// random chance to blink during idle. 5%
			if (Math.random() < 0.05) {
				setIsBlinking(true);
			}
		}

		return () => clearTimeout(timeout); // cleanup
	}, [currentFrame, isBlinking, blinkFrame]);

	// show image based on isblinking
	const imageSrc = isBlinking
		? BLINK_FRAMES[blinkFrame]
		: IDLE_FRAMES[currentFrame];

	return (
		<img
			src={`/eye/${imageSrc}`}
			alt="Animated Eyes"
			style={{ width: 250, height: 80 }}
		/>
	);
};

export default EyeAnimation;
