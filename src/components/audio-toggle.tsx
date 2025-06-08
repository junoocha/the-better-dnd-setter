"use client";

import { useRef, useState } from "react";

export default function AudioToggle({ src }: { src: string }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const toggleAudio = () => {
		if (!audioRef.current) {
			audioRef.current = new Audio(src);
			audioRef.current.loop = true;
		}
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={toggleAudio}
			className="text-white border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
		>
			{isPlaying ? "Pause Music" : "Play Music"}
		</button>
	);
}
