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
import FillPDFButton from "@/components/test-pdf";

// export default function Home() {
// 	const router = useRouter();
// 	const onSubmit = async () => {
// 		router.push("/default");
// 	};

// 	const sentences = ["you stink", "nah you do"];

// 	return (
// 		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// 			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
// 				<div className="flex gap-4 items-center flex-col sm:flex-row">
// 					<TextAnimation sentences={sentences} />
// 				</div>
// 			</main>
// 			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
// 			<button
// 				onClick={onSubmit}
// 				className="flex items-center gap-2 text-blue-600 hover:underline focus:outline-none"
// 			>
// 				Deploy now
// 			</button>
// 		</div>
// 	);
// }

export default function Home() {
	const router = useRouter();
	const onSubmit = async () => {
		router.push("/default");
	};

	const [cameFromBack, setCameFromBack] = useState(false);
	const [selectedPath, setSelectedPath] = useState<
		"gamble" | "boring" | "shop" | "default" | null
	>(null);
	const [finalSums, setFinalSums] = useState<number[]>([]);

	const [step, setStep] = useState(0);

	const steps = [
		<IntroText key="intro" onComplete={() => setStep(1)} />,
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
			onComplete={() => setStep(5)}
		/>,
	];

	return (
		<LoopPhaseProvider>
			<div className="min-h-screen grid place-items-center p-8 sm:p-20 font-sans bg-gray-950 text-white">
				<FillPDFButton />
				<main className="w-full max-w-3xl">
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
		</LoopPhaseProvider>
	);
}
