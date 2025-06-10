"use client";

import EyeAnimation from "./eye-animation";
import MouthAnimation from "./mouth-animation";

// literally here because i had them separate so they can show differently but nooooooo flex hates me and i have to do it like this
export default function Face() {
	return (
		<div className="flex flex-col items-center justify-center">
			<div className="ml-10 mb-3 sm:ml-6 sm:mb-5">
				<EyeAnimation />
			</div>
			<div className="">
				<MouthAnimation />
			</div>
		</div>
	);
}
