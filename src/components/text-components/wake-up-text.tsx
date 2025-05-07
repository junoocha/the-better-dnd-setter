import TextAnimation from "../text-animation/text-animation";
import { wakeupSentences } from "./sentence-arrays/wake-up-text-data";

type Props = {
	onComplete: () => void;
};

export default function WakeUpText({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation loopSentences={wakeupSentences} fadeTrue={false} />
		</div>
	);
}
