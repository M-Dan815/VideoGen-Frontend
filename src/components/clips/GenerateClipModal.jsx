import React, {useState} from "react";
import {Film, Zap} from "lucide-react";
import {Modal} from "@components/ui/Modal";
import {Select} from "@components/ui/Select";
import {Button} from "@components/ui/Button";

const ANIMATION_SHOTS = [
	{value: "push_in", label: "Push In"},
	{value: "pull_out", label: "Pull Out"},
	{value: "pan_left", label: "Pan Left"},
	{value: "pan_right", label: "Pan Right"},
	{value: "tilt_up", label: "Tilt Up"},
	{value: "tilt_down", label: "Tilt Down"},
	{value: "orbit_left", label: "Orbit Left"},
	{value: "orbit_right", label: "Orbit Right"},
	{value: "drone_push_in", label: "Drone Push In"},
	{value: "drone_pull_out", label: "Drone Pull Out"},
	{value: "drone_push_rotate", label: "Drone Push & Rotate"},
];

const DURATIONS = [
	{value: "2", label: "2 seconds"},
	{value: "3", label: "3 seconds"},
	{value: "4", label: "4 seconds"},
	{value: "5", label: "5 seconds"},
];

const RESOLUTIONS = [
	{value: "720p", label: "720p (HD)"},
	{value: "1080p", label: "1080p (Full HD)"},
];

export const GenerateClipModal = ({isOpen, onClose, image, onGenerate}) => {
	const [settings, setSettings] = useState({
		animationShot: image?.suggested_shot || "push_in",
		duration: "3",
		resolution: "720p",
		generateAudio: true,
	});
	const [loading, setLoading] = useState(false);

	const handleGenerate = async () => {
		setLoading(true);
		try {
			await onGenerate(image.id, {
				animationShot: settings.animationShot,
				duration: parseFloat(settings.duration),
				resolution: settings.resolution,
				generateAudio: settings.generateAudio,
			});
			onClose();
		} catch (err) {
			// Error handled in hook
		} finally {
			setLoading(false);
		}
	};

	if (!image) return null;

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Generate Video Clip"
			size="lg"
		>
			<div className="space-y-6">
				{/* Image Preview */}
				<div className="flex gap-6">
					<div className="w-48 h-32 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
						<img
							src={image.thumbnail_url || image.image_url}
							alt="Source"
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="flex-1">
						<h3 className="text-white font-medium mb-1">{image.filename}</h3>
						<p className="text-gray-400 text-sm">
							{image.width} × {image.height} pixels
						</p>
						{image.suggested_shot && (
							<p className="text-yellow-400 text-sm mt-2">
								<Zap className="w-4 h-4 inline mr-1" />
								AI suggests: {image.suggested_shot.replace(/_/g, " ")}
							</p>
						)}
					</div>
				</div>

				{/* Settings */}
				<div className="grid grid-cols-2 gap-4">
					<Select
						label="Animation Style"
						options={ANIMATION_SHOTS}
						value={settings.animationShot}
						onChange={(value) =>
							setSettings((prev) => ({...prev, animationShot: value}))
						}
					/>
					<Select
						label="Duration"
						options={DURATIONS}
						value={settings.duration}
						onChange={(value) =>
							setSettings((prev) => ({...prev, duration: value}))
						}
					/>
					<Select
						label="Resolution"
						options={RESOLUTIONS}
						value={settings.resolution}
						onChange={(value) =>
							setSettings((prev) => ({...prev, resolution: value}))
						}
					/>
					<div className="flex items-end pb-3">
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={settings.generateAudio}
								onChange={(e) =>
									setSettings((prev) => ({
										...prev,
										generateAudio: e.target.checked,
									}))
								}
								className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-yellow-400 focus:ring-yellow-400"
							/>
							<span className="text-gray-300">Generate Audio</span>
						</label>
					</div>
				</div>

				{/* Actions */}
				<div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleGenerate} loading={loading} icon={Film}>
						Generate Clip
					</Button>
				</div>
			</div>
		</Modal>
	);
};
