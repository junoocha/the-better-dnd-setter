import TextAnimation from "@/components/text-animation/text-animation";
import { introShopText } from "../../sentence-arrays/shop-text-data";

type IntroShopTextProps = {
	onComplete: () => void;
};

export default function IntroShopText({ onComplete }: IntroShopTextProps) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={introShopText}
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
