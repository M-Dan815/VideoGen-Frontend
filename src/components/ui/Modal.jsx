import React, {useEffect} from "react";
import {X} from "lucide-react";
import {createPortal} from "react-dom";

export const Modal = ({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	showClose = true,
}) => {
	const sizes = {
		sm: "max-w-md",
		md: "max-w-lg",
		lg: "max-w-2xl",
		xl: "max-w-4xl",
		full: "max-w-full mx-4",
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/70 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				className={`relative ${sizes[size]} w-full bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200`}
			>
				{/* Header */}
				{(title || showClose) && (
					<div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
						{title && <h2 className="text-xl font-bold text-white">{title}</h2>}
						{showClose && (
							<button
								onClick={onClose}
								className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
							>
								<X className="w-5 h-5" />
							</button>
						)}
					</div>
				)}

				{/* Content */}
				<div className="p-6">{children}</div>
			</div>
		</div>,
		document.body
	);
};
