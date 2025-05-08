import { createContext, useContext, useState } from "react";

export const LoopPhaseContext = createContext<{
	isIntroLoopPhase: boolean;
	setIsIntroLoopPhase: (value: boolean) => void;
}>({
	isIntroLoopPhase: false,
	setIsIntroLoopPhase: () => {},
});

export const useLoopPhase = () => {
	const context = useContext(LoopPhaseContext);

	// // Debug log to track state changes in context
	// console.log("Current isIntroLoopPhase:", context.isIntroLoopPhase);

	return context;
};

export function LoopPhaseProvider({ children }: { children: React.ReactNode }) {
	const [isIntroLoopPhase, setIsIntroLoopPhase] = useState(false);

	// Debug log when state is set
	const handleSetIsIntroLoopPhase = (value: boolean) => {
		// console.log("Setting isIntroLoopPhase to:", value);
		setIsIntroLoopPhase(value);
	};

	return (
		<LoopPhaseContext.Provider
			value={{
				isIntroLoopPhase,
				setIsIntroLoopPhase: handleSetIsIntroLoopPhase,
			}}
		>
			{children}
		</LoopPhaseContext.Provider>
	);
}
