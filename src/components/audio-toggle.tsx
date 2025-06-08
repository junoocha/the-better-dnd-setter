"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // optional icon support

export default function AudioToggle({ src }: { src: string }) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [volume, setVolume] = useState(0.5);

	const toggleAudio = () => {
		if (!audioRef.current) {
			audioRef.current = new Audio(src);
			audioRef.current.loop = true;
			audioRef.current.volume = volume;
		}

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = Number.parseFloat(e.target.value);
		setVolume(newVolume);
		if (audioRef.current) {
			audioRef.current.volume = newVolume;
		}
	};

	return (
		<div className="fixed top-4 left-4 z-50 flex items-center gap-3">
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={toggleAudio}
				className={`w-13 h-13 flex items-center justify-center rounded-full border transition 
					${
						isPlaying
							? "bg-green-500 border-green-500 text-white animate-pulse"
							: "border-white text-white hover:bg-white hover:text-black"
					}`}
				aria-label="Toggle audio"
			>
				{isPlaying ? (
					<Volume2 className="w-7 h-7" />
				) : (
					<VolumeX className="w-7 h-7" />
				)}
			</button>

			{isPlaying && (
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={volume}
					onChange={handleVolumeChange}
					className="w-24"
				/>
			)}
		</div>
	);
}
