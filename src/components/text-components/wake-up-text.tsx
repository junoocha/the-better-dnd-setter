import TextAnimation from "../text-animation/text-animation";
import {
	wakeupSentences,
	annoyedWakeupSentences,
} from "./sentence-arrays/wake-up-text-data";
import { useLoopPhase } from "../text-animation/loop-phase-context";

type Props = {
	onComplete: () => void;
};

export default function WakeUpText({ onComplete }: Props) {
	const { isIntroLoopPhase } = useLoopPhase();

	const selectedSentences = isIntroLoopPhase
		? annoyedWakeupSentences
		: wakeupSentences;

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={selectedSentences}
				fadeTrue={true}
				numSentences={1}
				onLoopStart={() => {
					// Delay so the first loop sentence has time to show before moving on
					setTimeout(onComplete, 2500); // 2500 for testing, seems like 4000 works for regular
				}}
			/>
		</div>
	);
}
