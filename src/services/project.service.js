import api from "./api";

const projectService = {
	// Get all projects with pagination
	getProjects: async (skip = 0, limit = 10) => {
		const response = await api.get("/projects", {
			params: {skip, limit},
		});
		return response.data;
	},

	// Get single project by ID
	getProject: async (projectId) => {
		const response = await api.get(`/projects/${projectId}`);
		return response.data;
	},

	// Create new project
	createProject: async (name = null) => {
		const response = await api.post("/projects", {name});
		return response.data;
	},

	// Delete project
	deleteProject: async (projectId) => {
		const response = await api.delete(`/projects/${projectId}`);
		return response.data;
	},

	// Get project status with details
	getProjectStatus: async (projectId) => {
		const response = await api.get(`/projects/${projectId}/status`);
		return response.data;
	},
};

export default projectService;
