import TextAnimation from "@/components/text-animation/text-animation";
import { introShopText } from "../../sentence-arrays/shop-text-data";

type IntroShopTextProps = {
	onComplete: () => void;
};

export default function IntroShopText({ onComplete }: IntroShopTextProps) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={introShopText}
				fadeTrue={true}
				numSentences={1}
				onComplete={onComplete}
			/>
		</div>
	);
}
