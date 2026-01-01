import {useState, useEffect, useCallback} from "react";
import projectService from "@services/project.service";
import toast from "react-hot-toast";

export const useProjects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [total, setTotal] = useState(0);

	const fetchProjects = useCallback(async (skip = 0, limit = 20) => {
		try {
			setLoading(true);
			const data = await projectService.getProjects(skip, limit);
			setProjects(data.projects || []);
			setTotal(data.total || 0);
			setError(null);
		} catch (err) {
			setError(err.message);
			toast.error("Failed to load projects");
		} finally {
			setLoading(false);
		}
	}, []);

	const createProject = useCallback(async (name) => {
		try {
			const newProject = await projectService.createProject(name);
			setProjects((prev) => [newProject, ...prev]);
			toast.success("Project created successfully!");
			return newProject;
		} catch (err) {
			toast.error("Failed to create project");
			throw err;
		}
	}, []);

	const deleteProject = useCallback(async (projectId) => {
		try {
			await projectService.deleteProject(projectId);
			setProjects((prev) => prev.filter((p) => p.id !== projectId));
			toast.success("Project deleted");
		} catch (err) {
			toast.error("Failed to delete project");
			throw err;
		}
	}, []);

	useEffect(() => {
		fetchProjects();
	}, [fetchProjects]);

	return {
		projects,
		loading,
		error,
		total,
		fetchProjects,
		createProject,
		deleteProject,
		refetch: fetchProjects,
	};
};
