"use client";

import TextAnimation from "../components/text-animation/text-animation";
import { useRouter } from "next/navigation";
import { LoopPhaseProvider } from "@/components/text-animation/loop-phase-context";
import { useState } from "react";
import IntroText from "@/components/text-components/intro-text";
import ChooseStats from "@/components/text-components/choose-stats";
import WakeUpText from "@/components/text-components/wake-up-text";
import GambleStats from "@/components/text-components/stat-choosing/gamble-stats";
import GivenStats from "@/components/text-components/stat-choosing/given-stats";
import ShopStats from "@/components/text-components/stat-choosing/shop-stats";
import StatAssignment from "@/components/text-components/set-stats";
import { AnimatePresence, motion } from "framer-motion";
import Results from "@/components/text-components/results";
import RandomStats from "@/components/text-components/get-random-stats";
import AudioToggle from "@/components/audio-toggle";

export default function Home() {
	const router = useRouter();

	const [cameFromBack, setCameFromBack] = useState(false);
	const [selectedPath, setSelectedPath] = useState<
		"gamble" | "boring" | "shop" | "default" | null
	>(null);
	const [finalSums, setFinalSums] = useState<number[]>([]);
	const [finalAssignment, setFinalAssignment] = useState<Record<
		string,
		number
	> | null>(null);

	const [step, setStep] = useState(0);

	// simple website, keep things flowing, don't use nextjs page routing, just cycle through steps.
	const steps = [
		<IntroText
			key="intro"
			onComplete={(nextStep: number) => setStep(nextStep)}
		/>,
		<WakeUpText key="wakeuptext" onComplete={() => setStep(2)} />,
		<ChooseStats
			key="choosestats"
			onComplete={(selection) => {
				setSelectedPath(selection);
				setStep(3);
			}}
		/>,
		selectedPath === "gamble" ? (
			<GambleStats
				key="gamble"
				onComplete={(finalSums) => {
					console.log("test", finalSums);
					setFinalSums(finalSums);
					setStep(4);
				}}
				onBack={() => {
					setSelectedPath(null);
					setStep(2);
				}}
			/>
		) : selectedPath === "boring" ? (
			<GivenStats
				key="boring"
				onComplete={() => {
					const finalSums = [8, 10, 12, 13, 14, 15];
					setFinalSums(finalSums);
					setStep(4);
					console.log("standard", finalSums);
				}}
				onBack={() => {
					setSelectedPath(null);
					setCameFromBack(true);
					setStep(2);
				}}
			/>
		) : selectedPath === "shop" ? (
			<ShopStats
				key="shop"
				onComplete={(finalSums) => {
					console.log("Shop", finalSums);
					setFinalSums(finalSums);
					setStep(4);
				}}
				onBack={() => {
					setSelectedPath(null);
					setCameFromBack(true);
					setStep(2);
				}}
			/>
		) : (
			<div key="none">Error: No path selected</div>
		),
		<StatAssignment
			key="stat-assignment"
			statValues={finalSums}
			onComplete={(assigned) => {
				setFinalAssignment(assigned);
				setStep(5);
			}}
		/>,
		<Results
			key="final-results"
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			assignment={finalAssignment!}
			onComplete={() => setStep(2)}
		/>,
		<RandomStats key="random-stats" onComplete={() => setStep(0)} />,
	];

	return (
		<LoopPhaseProvider>
			<div className="relative sm:static sm:top-auto sm:left-auto">
				<AudioToggle src="/personalityquiz.mp3" />
			</div>
			<div className="min-h-screen w-full bg-gray-950 text-white font-sans">
				<div className="grid place-items-center px-4 py-8 sm:px-12 sm:py-20 min-h-screen">
					<main className="w-full max-w-3xl -mt-5  mx-auto px-4">
						<AnimatePresence mode="wait">
							<motion.div
								key={step}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 1 }}
							>
								{steps[step]}
							</motion.div>
						</AnimatePresence>
					</main>
				</div>
			</div>
		</LoopPhaseProvider>
	);
}
