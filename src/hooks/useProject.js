import {useState, useEffect, useCallback} from "react";
import projectService from "@services/project.service";
import imageService from "@services/image.service";
import clipService from "@services/clip.service";
import toast from "react-hot-toast";

export const useProject = (projectId) => {
	const [project, setProject] = useState(null);
	const [images, setImages] = useState([]);
	const [clips, setClips] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchProject = useCallback(async () => {
		if (!projectId) return;

		try {
			setLoading(true);
			const [projectData, imagesData, clipsData] = await Promise.all([
				projectService.getProject(projectId),
				imageService.getImages(projectId),
				clipService.getClips(projectId),
			]);

			setProject(projectData.project || projectData);
			setImages(imagesData.images || imagesData || []);
			setClips(clipsData.clips || clipsData || []);
			setError(null);
		} catch (err) {
			setError(err.message);
			toast.error("Failed to load project");
		} finally {
			setLoading(false);
		}
	}, [projectId]);

	const uploadImage = useCallback(
		async (file, onProgress) => {
			try {
				const result = await imageService.uploadImage(
					projectId,
					file,
					onProgress
				);
				const newImage = result.image || result;
				setImages((prev) => [...prev, newImage]);
				toast.success("Image uploaded successfully!");
				return newImage;
			} catch (err) {
				toast.error("Failed to upload image");
				throw err;
			}
		},
		[projectId]
	);

	const deleteImage = useCallback(
		async (imageId) => {
			try {
				await imageService.deleteImage(projectId, imageId);
				setImages((prev) => prev.filter((img) => img.id !== imageId));
				toast.success("Image deleted");
			} catch (err) {
				toast.error("Failed to delete image");
				throw err;
			}
		},
		[projectId]
	);

	const generateClip = useCallback(
		async (imageId, options = {}) => {
			try {
				const clip = await clipService.generateClip(
					projectId,
					imageId,
					options
				);
				setClips((prev) => [...prev, clip]);
				toast.success("Clip generation started!");
				return clip;
			} catch (err) {
				toast.error("Failed to generate clip");
				throw err;
			}
		},
		[projectId]
	);

	const refreshClip = useCallback(
		async (clipId) => {
			try {
				const updatedClip = await clipService.getClip(projectId, clipId);
				setClips((prev) =>
					prev.map((c) => (c.id === clipId ? updatedClip : c))
				);
				return updatedClip;
			} catch (err) {
				console.error("Failed to refresh clip:", err);
				throw err;
			}
		},
		[projectId]
	);

	const deleteClip = useCallback(
		async (clipId) => {
			try {
				await clipService.deleteClip(projectId, clipId);
				setClips((prev) => prev.filter((c) => c.id !== clipId));
				toast.success("Clip deleted");
			} catch (err) {
				toast.error("Failed to delete clip");
				throw err;
			}
		},
		[projectId]
	);

	useEffect(() => {
		fetchProject();
	}, [fetchProject]);

	return {
		project,
		images,
		clips,
		loading,
		error,
		fetchProject,
		uploadImage,
		deleteImage,
		generateClip,
		refreshClip,
		deleteClip,
		refetch: fetchProject,
	};
};
