import React from "react";

export const Spinner = ({size = "md", className = ""}) => {
	const sizes = {
		sm: "w-4 h-4",
		md: "w-8 h-8",
		lg: "w-12 h-12",
		xl: "w-16 h-16",
	};

	return (
		<div className={`${sizes[size]} ${className}`}>
			<div className="w-full h-full border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
		</div>
	);
};

export const LoadingScreen = ({message = "Loading..."}) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px]">
			<Spinner size="lg" />
			<p className="mt-4 text-gray-400">{message}</p>
		</div>
	);
};
