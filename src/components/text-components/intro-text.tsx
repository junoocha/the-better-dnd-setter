import TextAnimation from "../TextAnimation";

type Props = {
	onComplete: () => void;
};

export default function IntroText({ onComplete }: Props) {
	const sentences = [
		"Welcome to the D&D Character Stat Setter.",
		"Hello? Are you still there?",
		"You tryna make a character or what?",
		"Can you wake him up? I've got stuff to do.",
		"Hey man ... press the blue button.",
		"I hate my job.",
		"See that blue rectangle? Wanna left click on that?",
		"Please wake up the bard so I can leave.",
	];

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
