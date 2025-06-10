"use client";

import EyeAnimation from "./eye-animation";
import MouthAnimation from "./mouth-animation";

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
