import React from "react";
import {Button} from "./Button";

export const EmptyState = ({
	icon: Icon,
	title,
	description,
	action,
	actionLabel,
	actionIcon,
}) => {
	return (
		<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
			{Icon && (
				<div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
					<Icon className="w-8 h-8 text-yellow-400" />
				</div>
			)}
			<h3 className="text-xl font-bold text-white mb-2">{title}</h3>
			{description && (
				<p className="text-gray-400 max-w-md mb-6">{description}</p>
			)}
			{action && (
				<Button onClick={action} icon={actionIcon}>
					{actionLabel}
				</Button>
			)}
		</div>
	);
};
