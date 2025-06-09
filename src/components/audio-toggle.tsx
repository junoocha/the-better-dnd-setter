"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

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
			<motion.button
				animate={{
					boxShadow: isPlaying
						? "0 0 10px 3px rgba(168,85,247,0.7)" // green glow
						: "0 0 0px 0px rgba(0,0,0,0)",
				}}
				onClick={toggleAudio}
				className={`w-11 h-11 flex items-center justify-center rounded-full border transition 
					${
						isPlaying
							? "bg-black border-purple-500 text-white animate-pulse"
							: "border-white text-white hover:border-purple-500"
					}`}
				aria-label="Toggle audio"
			>
				{isPlaying ? (
					<Volume2 className="w-6 h-6" />
				) : (
					<VolumeX className="w-6 h-6" />
				)}
			</motion.button>

			{isPlaying && (
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={volume}
					onChange={handleVolumeChange}
					className="w-24 accent-purple-500"
				/>
			)}
		</div>
	);
}
