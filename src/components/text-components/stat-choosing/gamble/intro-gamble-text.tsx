import TextAnimation from "@/components/text-animation/text-animation";
import { introGambleText } from "../../sentence-arrays/gamble-text-data";

// import { useLoopPhase } from "../text-animation/loop-phase-context";

type Props = {
	onComplete: () => void;
};

export default function IntroGambleText({ onComplete }: Props) {
	// const { isIntroLoopPhase } = useLoopPhase();

	// const selectedSentences = isIntroLoopPhase
	// 	? annoyedWakeupSentences
	// 	: wakeupSentences;

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={introGambleText}
				fadeTrue={true}
				numSentences={1}
				onLoopStart={() => {
					// Delay so the first loop sentence has time to show before moving on
					setTimeout(onComplete, 2500); // tweak this number to match timing
				}}
			/>
		</div>
	);
}
