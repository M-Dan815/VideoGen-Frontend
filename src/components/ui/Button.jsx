import React from "react";
import {Loader2} from "lucide-react";

const variants = {
	primary:
		"bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-900 font-semibold shadow-lg shadow-yellow-500/25",
	secondary: "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700",
	outline:
		"border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-gray-900",
	ghost: "text-gray-300 hover:text-white hover:bg-gray-800",
	danger: "bg-red-600 hover:bg-red-700 text-white",
};

const sizes = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-lg",
	xl: "px-8 py-4 text-xl",
};

export const Button = ({
	children,
	variant = "primary",
	size = "md",
	loading = false,
	disabled = false,
	icon: Icon,
	iconPosition = "left",
	className = "",
	...props
}) => {
	const baseClasses =
		"inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed";

	return (
		<button
			className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<Loader2 className="w-5 h-5 animate-spin mr-2" />
			) : Icon && iconPosition === "left" ? (
				<Icon className="w-5 h-5 mr-2" />
			) : null}
			{children}
			{Icon && iconPosition === "right" && !loading && (
				<Icon className="w-5 h-5 ml-2" />
			)}
		</button>
	);
};
