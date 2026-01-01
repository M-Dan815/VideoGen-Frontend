import React from "react";
import {ChevronDown} from "lucide-react";

export const Select = ({
	label,
	options,
	value,
	onChange,
	placeholder = "Select an option",
	className = "",
}) => {
	return (
		<div className="space-y-1">
			{label && (
				<label className="block text-sm font-medium text-gray-300">
					{label}
				</label>
			)}
			<div className="relative">
				<select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`
            w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl
            text-white appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent
            transition-all duration-200
            ${className}
          `}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
			</div>
		</div>
	);
};
