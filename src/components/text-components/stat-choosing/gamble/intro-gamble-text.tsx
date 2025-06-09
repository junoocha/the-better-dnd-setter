import TextAnimation from "@/components/text-animation/text-animation";
import { introGambleText } from "../../sentence-arrays/gamble-text-data";

// import { useLoopPhase } from "../text-animation/loop-phase-context";

type Props = {
	onComplete: () => void;
};

export default function IntroGambleText({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={introGambleText}
				fadeTrue={true}
				numSentences={1}
				onComplete={onComplete}
			/>
		</div>
	);
}
