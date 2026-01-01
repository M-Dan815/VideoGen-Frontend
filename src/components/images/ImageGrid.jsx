import React from "react";
import {Film, Trash2, AlertTriangle, Check} from "lucide-react";
import {Badge} from "@components/ui/Badge";
import {Button} from "@components/ui/Button";

export const ImageGrid = ({
	images,
	onGenerateClip,
	onDeleteImage,
	generatingImageIds = [],
	completedImageIds = [],
}) => {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
			{images.map((image) => (
				<ImageCard
					key={image.id}
					image={image}
					onGenerateClip={onGenerateClip}
					onDelete={onDeleteImage}
					isGenerating={generatingImageIds.includes(image.id)}
					hasClip={completedImageIds.includes(image.id)}
				/>
			))}
		</div>
	);
};

const ImageCard = ({
	image,
	onGenerateClip,
	onDelete,
	isGenerating,
	hasClip,
}) => {
	const hasWarnings = image.warnings && image.warnings.length > 0;

	return (
		<div className="relative group aspect-square rounded-xl overflow-hidden bg-gray-800 border border-gray-700">
			{/* Image */}
			<img
				src={image.thumbnail_url || image.image_url}
				alt={image.filename}
				className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
			/>

			{/* Overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Status Badges */}
			<div className="absolute top-2 left-2 flex gap-1">
				{hasClip && (
					<Badge variant="success">
						<Check className="w-3 h-3 mr-1" />
						Clip Ready
					</Badge>
				)}
				{hasWarnings && (
					<Badge variant="warning">
						<AlertTriangle className="w-3 h-3" />
					</Badge>
				)}
			</div>

			{/* Suggested Shot */}
			{image.suggested_shot && (
				<div className="absolute top-2 right-2">
					<Badge variant="info">{image.suggested_shot}</Badge>
				</div>
			)}

			{/* Actions */}
			<div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<Button
					size="sm"
					onClick={() => onGenerateClip(image)}
					loading={isGenerating}
					disabled={isGenerating || hasClip}
					icon={Film}
				>
					{hasClip ? "Done" : "Generate"}
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => onDelete(image.id)}
					disabled={isGenerating}
				>
					<Trash2 className="w-4 h-4 text-red-400" />
				</Button>
			</div>

			{/* Dimensions */}
			<div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<span className="text-xs text-gray-300 bg-black/50 px-2 py-1 rounded">
					{image.width}×{image.height}
				</span>
			</div>
		</div>
	);
};
