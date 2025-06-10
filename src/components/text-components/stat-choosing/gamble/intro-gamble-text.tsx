import TextAnimation from "@/components/text-animation/text-animation";
import { introGambleText } from "../../sentence-arrays/gamble-text-data";

type Props = {
	onComplete: () => void;
};

export default function IntroGambleText({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center px-4 sm:px-0">
			<TextAnimation
				initialSentences={introGambleText}
				fadeTrue={true}
				numSentences={1}
				onComplete={onComplete}
			/>
		</div>
	);
}
