import React from "react";

export const ProgressBar = ({
	value,
	max = 100,
	showLabel = true,
	size = "md",
	color = "yellow",
}) => {
	const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

	const sizes = {
		sm: "h-1",
		md: "h-2",
		lg: "h-3",
	};

	const colors = {
		yellow: "bg-gradient-to-r from-yellow-400 to-amber-500",
		green: "bg-gradient-to-r from-green-400 to-emerald-500",
		blue: "bg-gradient-to-r from-blue-400 to-cyan-500",
		red: "bg-gradient-to-r from-red-400 to-rose-500",
	};

	return (
		<div className="w-full">
			<div
				className={`w-full bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}
			>
				<div
					className={`${colors[color]} ${sizes[size]} rounded-full transition-all duration-500 ease-out`}
					style={{width: `${percentage}%`}}
				/>
			</div>
			{showLabel && (
				<p className="mt-1 text-xs text-gray-400 text-right">
					{Math.round(percentage)}%
				</p>
			)}
		</div>
	);
};
