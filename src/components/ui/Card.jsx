import React from "react";

export const Card = ({children, className = "", hover = false, onClick}) => {
	const baseClasses =
		"bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden";
	const hoverClasses = hover
		? "transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 cursor-pointer"
		: "";

	return (
		<div
			className={`${baseClasses} ${hoverClasses} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export const CardHeader = ({children, className = ""}) => (
	<div className={`px-6 py-4 border-b border-gray-700/50 ${className}`}>
		{children}
	</div>
);

export const CardContent = ({children, className = ""}) => (
	<div className={`p-6 ${className}`}>{children}</div>
);

export const CardFooter = ({children, className = ""}) => (
	<div className={`px-6 py-4 border-t border-gray-700/50 ${className}`}>
		{children}
	</div>
);
