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
			/>
		</div>
	);
}
