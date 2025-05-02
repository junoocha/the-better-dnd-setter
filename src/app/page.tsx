"use client";

import Image from "next/image";
import TextAnimation from "../components/TextAnimation";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const onSubmit = async () => {
		router.push("/default");
	};

	const sentences = ["you stink", "nah you do"];

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<TextAnimation sentences={sentences} />
				</div>
			</main>
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onSubmit}
				className="flex items-center gap-2 text-blue-600 hover:underline focus:outline-none"
			>
				<Image
					className="dark:invert"
					src="/vercel.svg"
					alt="Vercel logomark"
					width={20}
					height={20}
				/>
				Deploy now
			</button>
		</div>
	);
}
