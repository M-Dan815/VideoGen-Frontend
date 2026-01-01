import api from "./api";

const imageService = {
	// Upload image to project
	uploadImage: async (projectId, file, onProgress = null) => {
		const formData = new FormData();
		formData.append("file", file);

		const response = await api.post(`/projects/${projectId}/images`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
			onUploadProgress: (progressEvent) => {
				if (onProgress) {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					onProgress(percentCompleted);
				}
			},
		});
		return response.data;
	},

	// Upload multiple images
	uploadImages: async (projectId, files, onProgress = null) => {
		const formData = new FormData();
		files.forEach((file) => {
			formData.append("files", file);
		});

		const response = await api.post(
			`/projects/${projectId}/images/bulk`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
				onUploadProgress: (progressEvent) => {
					if (onProgress) {
						const percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						onProgress(percentCompleted);
					}
				},
			}
		);
		return response.data;
	},

	// Get all images for a project
	getImages: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/images`);
		return response.data;
	},

	// Get single image details
	getImage: async (projectId, imageId) => {
		const response = await api.get(`/projects/${projectId}/images/${imageId}`);
		return response.data;
	},

	// Delete image
	deleteImage: async (projectId, imageId) => {
		const response = await api.delete(
			`/projects/${projectId}/images/${imageId}`
		);
		return response.data;
	},

	// Reorder images
	reorderImages: async (projectId, imageOrders) => {
		const response = await api.put(`/projects/${projectId}/images/reorder`, {
			image_orders: imageOrders,
		});
		return response.data;
	},
};

export default imageService;
