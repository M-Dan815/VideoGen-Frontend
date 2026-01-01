import React from "react";

const variants = {
	default: "bg-gray-700 text-gray-300",
	primary: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
	success: "bg-green-500/20 text-green-400 border border-green-500/30",
	warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
	error: "bg-red-500/20 text-red-400 border border-red-500/30",
	info: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
};

export const Badge = ({children, variant = "default", className = ""}) => {
	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
		>
			{children}
		</span>
	);
};
