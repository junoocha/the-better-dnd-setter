import TextAnimation from "@/components/text-animation/text-animation";
import { introShopText } from "../../sentence-arrays/shop-text-data";

type Props = {
	onComplete: () => void;
};

export default function AlertShopKeeper({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				loopSentences={introShopText}
				fadeTrue={false}
				numSentences={1}
				onComplete={onComplete}
			/>
		</div>
	);
}
