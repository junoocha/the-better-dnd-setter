"use client";

import TextAnimation from "../components/TextAnimation";
import { useRouter } from "next/navigation";

import { useState } from "react";
import IntroText from "@/components/text-components/intro-text";
import ChooseStats from "@/components/text-components/choose-stats";
import { AnimatePresence, motion } from "framer-motion";

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
	const [step, setStep] = useState(0);

	const steps = [
		<IntroText key="intro" onComplete={() => setStep(1)} />,
		<ChooseStats key="stats" onComplete={() => setStep(2)} />,
	];

	return (
		<div className="min-h-screen grid place-items-center p-8 sm:p-20 font-sans bg-gray-950 text-white">
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
	);
}
