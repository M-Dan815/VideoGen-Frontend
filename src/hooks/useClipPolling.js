import {useEffect, useRef, useCallback} from "react";
import clipService from "@services/clip.service";

export const useClipPolling = (projectId, clips, onClipUpdate) => {
	const pollingRef = useRef({});

	const startPolling = useCallback(
		(clipId) => {
			if (pollingRef.current[clipId]) return;

			const poll = async () => {
				try {
					const updatedClip = await clipService.getClip(projectId, clipId);
					onClipUpdate(updatedClip);

					if (
						updatedClip.status === "completed" ||
						updatedClip.status === "error"
					) {
						clearInterval(pollingRef.current[clipId]);
						delete pollingRef.current[clipId];
					}
				} catch (err) {
					console.error("Polling error:", err);
				}
			};

			pollingRef.current[clipId] = setInterval(poll, 3000);
			poll(); // Initial call
		},
		[projectId, onClipUpdate]
	);

	const stopPolling = useCallback((clipId) => {
		if (pollingRef.current[clipId]) {
			clearInterval(pollingRef.current[clipId]);
			delete pollingRef.current[clipId];
		}
	}, []);

	const stopAllPolling = useCallback(() => {
		Object.keys(pollingRef.current).forEach((clipId) => {
			clearInterval(pollingRef.current[clipId]);
		});
		pollingRef.current = {};
	}, []);

	// Auto-start polling for pending/generating clips
	useEffect(() => {
		clips.forEach((clip) => {
			if (
				(clip.status === "pending" || clip.status === "generating") &&
				!pollingRef.current[clip.id]
			) {
				startPolling(clip.id);
			}
		});

		return () => stopAllPolling();
	}, [clips, startPolling, stopAllPolling]);

	return {startPolling, stopPolling, stopAllPolling};
};
