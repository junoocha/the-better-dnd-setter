import TextAnimation from "../text-animation/text-animation";
import { intro, loopSentences } from "./sentence-arrays/intro-text-data";

type Props = {
	onComplete: () => void;
};

export default function IntroText({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation loopSentences={loopSentences} fadeTrue={false} />
		</div>
	);
}
