import api from "./api";

const videoService = {
	// Generate preview video
	generatePreview: async (projectId) => {
		const response = await api.post(`/projects/${projectId}/video/preview`);
		return response.data;
	},

	// Get video status
	getVideoStatus: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/video`);
		return response.data;
	},

	// Generate final video
	generateFinal: async (projectId) => {
		const response = await api.post(`/projects/${projectId}/video/final`);
		return response.data;
	},

	// Update video settings
	updateSettings: async (projectId, settings) => {
		const response = await api.put(
			`/projects/${projectId}/video/settings`,
			settings
		);
		return response.data;
	},

	// Upload logo
	uploadLogo: async (projectId, file) => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await api.post(
			`/projects/${projectId}/video/logo`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
		return response.data;
	},

	// Get available soundtracks
	getSoundtracks: async () => {
		const response = await api.get("/video/soundtracks");
		return response.data;
	},
};

export default videoService;
