type Props = {
	onComplete: () => void;
};

export default function ChooseStats({ onComplete }: Props) {
	return (
		<div className="flex flex-col gap-6 items-center text-center">
			<p className="text-xl">Part 2Welcome to the D&D Character Creator.</p>
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
