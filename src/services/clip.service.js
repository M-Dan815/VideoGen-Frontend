import api from "./api";

const clipService = {
	// Generate clip from image
	generateClip: async (projectId, imageId, options = {}) => {
		const requestData = {
			image_id: imageId,
			animation_shot: options.animationShot || "push_in",
			duration: options.duration || 3.0,
			options: {
				generate_audio: options.generateAudio ?? true,
				resolution: options.resolution || "720p",
				aspect_ratio: options.aspectRatio || "16:9",
				fps: options.fps || 24,
			},
		};

		const response = await api.post(
			`/projects/${projectId}/clips`,
			requestData
		);
		return response.data;
	},

	// Get clip status
	getClip: async (projectId, clipId) => {
		const response = await api.get(`/projects/${projectId}/clips/${clipId}`);
		return response.data;
	},

	// Get all clips for a project
	getClips: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/clips`);
		return response.data;
	},

	// Regenerate clip with different settings
	regenerateClip: async (projectId, clipId, options = {}) => {
		const requestData = {
			animation_shot: options.animationShot,
			duration: options.duration,
			options: options.generationOptions || {},
		};

		const response = await api.put(
			`/projects/${projectId}/clips/${clipId}/regenerate`,
			requestData
		);
		return response.data;
	},

	// Delete clip
	deleteClip: async (projectId, clipId) => {
		const response = await api.delete(`/projects/${projectId}/clips/${clipId}`);
		return response.data;
	},

	// Reorder clips
	reorderClips: async (projectId, clipOrders) => {
		const response = await api.put(`/projects/${projectId}/clips/reorder`, {
			clip_orders: clipOrders,
		});
		return response.data;
	},

	// Get available animation shots
	getAvailableShots: async () => {
		const response = await api.get("/clips/shots");
		return response.data;
	},

	// Get clip grid for UI
	getClipGrid: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/clips/grid`);
		return response.data;
	},
};

export default clipService;
