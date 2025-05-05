import TextAnimation from "../TextAnimation";

type Props = {
	onComplete: () => void;
};

export default function IntroText({ onComplete }: Props) {
	const intro = ["Welcome to the D&D Character Stat Setter."];
	const sentences = [
		"Hello? Are you still there?",
		"You tryna make a character or what?",
		"Can you wake him up? I've got stuff to do.",
		"Hey man ... press the blue button.",
		"I hate my job.",
		"See that blue rectangle? Wanna left click on that?",
		"Please wake up the bard so I can leave.",
		"I'm literally just text, and I'm already stressed out.",
		"Did you fall asleep? Should I come back later?",
		"I'm not saying you're slow, but the tortoise is worried about you.",
		"Stat-setting shouldn't be this emotionally taxing.",
		"If I had a copper for every second you're wasting...",
		"The bard is dreaming about spreadsheets. Wake him up.",
		"This is why wizards don't let the party handle UI.",
		"You know this isn't turn-based, right?",
		"The blue button isn’t gonna press itself, champ.",
		"At this rate, the villain's already won. AKA the dungeon master.",
		"Press the button before I roll a nat 1 on patience.",
		"You're really making me miss the goblin encounter.",
		"I'm just the intro text, and even I want a break.",
		"If passive-aggressive tooltips were a spell, you'd be toast.",
		"Any slower and this would be a loading screen in Skyrim.",
		"Even children on Roblox can press a button bro.",
	];

	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<TextAnimation
				initialSentences={intro}
				loopSentences={sentences}
				fadeTrue={false}
			/>
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
