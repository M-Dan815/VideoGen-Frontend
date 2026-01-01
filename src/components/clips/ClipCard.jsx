import React from "react";
import {
	Play,
	RefreshCw,
	Trash2,
	Clock,
	CheckCircle,
	AlertCircle,
	Loader2,
} from "lucide-react";
import {Card} from "@components/ui/Card";
import {Badge} from "@components/ui/Badge";
import {Button} from "@components/ui/Button";

const statusConfig = {
	pending: {
		variant: "default",
		label: "Pending",
		icon: Clock,
	},
	generating: {
		variant: "warning",
		label: "Generating",
		icon: Loader2,
	},
	completed: {
		variant: "success",
		label: "Completed",
		icon: CheckCircle,
	},
	error: {
		variant: "error",
		label: "Failed",
		icon: AlertCircle,
	},
};

export const ClipCard = ({clip, onPlay, onRegenerate, onDelete}) => {
	const status = statusConfig[clip.status] || statusConfig.pending;
	const StatusIcon = status.icon;
	const isProcessing =
		clip.status === "pending" || clip.status === "generating";

	return (
		<Card className="overflow-hidden">
			{/* Preview */}
			<div className="relative aspect-video bg-gray-900">
				{clip.preview_gif_url || clip.clip_url ? (
					<img
						src={clip.preview_gif_url || clip.clip_url}
						alt="Clip preview"
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<StatusIcon
							className={`w-12 h-12 text-gray-600 ${
								clip.status === "generating" ? "animate-spin" : ""
							}`}
						/>
					</div>
				)}

				{/* Play Button Overlay */}
				{clip.status === "completed" && clip.clip_url && (
					<button
						onClick={() => onPlay(clip)}
						className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"
					>
						<div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center">
							<Play className="w-8 h-8 text-gray-900 ml-1" />
						</div>
					</button>
				)}

				{/* Status Badge */}
				<div className="absolute top-3 left-3">
					<Badge variant={status.variant}>
						<StatusIcon
							className={`w-3 h-3 mr-1 ${
								clip.status === "generating" ? "animate-spin" : ""
							}`}
						/>
						{status.label}
					</Badge>
				</div>
			</div>

			{/* Info */}
			<div className="p-4">
				<div className="flex items-center justify-between mb-3">
					<div>
						<p className="text-white font-medium capitalize">
							{clip.animation_shot?.replace(/_/g, " ") || "Default Shot"}
						</p>
						<p className="text-gray-400 text-sm">{clip.duration}s duration</p>
					</div>
				</div>

				{/* Error Message */}
				{clip.status === "error" && clip.error_message && (
					<div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
						<p className="text-red-400 text-sm">{clip.error_message}</p>
					</div>
				)}

				{/* Generation Time */}
				{clip.generation_time_ms && (
					<p className="text-gray-500 text-xs mb-3">
						Generated in {(clip.generation_time_ms / 1000).toFixed(1)}s
					</p>
				)}

				{/* Actions */}
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onRegenerate(clip)}
						disabled={isProcessing}
						icon={RefreshCw}
						className="flex-1"
					>
						Regenerate
					</Button>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => onDelete(clip.id)}
						disabled={isProcessing}
					>
						<Trash2 className="w-4 h-4 text-red-400" />
					</Button>
				</div>
			</div>
		</Card>
	);
};
