import React from "react";
import {Download, ExternalLink} from "lucide-react";
import {Modal} from "@components/ui/Modal";
import {Button} from "@components/ui/Button";

export const VideoPlayerModal = ({isOpen, onClose, clip}) => {
	if (!clip) return null;

	const handleDownload = () => {
		if (clip.clip_url) {
			window.open(clip.clip_url, "_blank");
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} title="Video Preview" size="xl">
			<div className="space-y-4">
				{/* Video Player */}
				<div className="aspect-video bg-black rounded-xl overflow-hidden">
					{clip.clip_url ? (
						<video
							src={clip.clip_url}
							controls
							autoPlay
							className="w-full h-full"
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center text-gray-500">
							Video not available
						</div>
					)}
				</div>

				{/* Info */}
				<div className="flex items-center justify-between">
					<div>
						<p className="text-white font-medium capitalize">
							{clip.animation_shot?.replace(/_/g, " ")}
						</p>
						<p className="text-gray-400 text-sm">
							{clip.duration}s •{" "}
							{clip.file_size
								? `${(clip.file_size / 1024 / 1024).toFixed(2)} MB`
								: ""}
						</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" onClick={handleDownload} icon={Download}>
							Download
						</Button>
						<Button
							variant="ghost"
							onClick={() => window.open(clip.clip_url, "_blank")}
							icon={ExternalLink}
						>
							Open
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};
