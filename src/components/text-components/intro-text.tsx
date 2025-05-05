import TextAnimation from "../TextAnimation";

type Props = {
	onComplete: () => void;
};

export default function IntroText({ onComplete }: Props) {
	const sentences = ["Welcome to the D&D Character Creator."];

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation sentences={sentences} fadeTrue={false} />
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={onComplete}
				className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
			>
				Wake up the bard?
			</button>
		</div>
	);
}
