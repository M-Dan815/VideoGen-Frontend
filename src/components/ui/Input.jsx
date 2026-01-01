import React, {forwardRef} from "react";

export const Input = forwardRef(
	({label, error, icon: Icon, className = "", ...props}, ref) => {
		return (
			<div className="space-y-1">
				{label && (
					<label className="block text-sm font-medium text-gray-300">
						{label}
					</label>
				)}
				<div className="relative">
					{Icon && (
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Icon className="h-5 w-5 text-gray-400" />
						</div>
					)}
					<input
						ref={ref}
						className={`
              w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
              text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
              transition-all duration-200
              ${Icon ? "pl-10" : ""}
              ${error ? "border-red-500" : ""}
              ${className}
            `}
						{...props}
					/>
				</div>
				{error && <p className="text-sm text-red-400">{error}</p>}
			</div>
		);
	}
);

Input.displayName = "Input";
