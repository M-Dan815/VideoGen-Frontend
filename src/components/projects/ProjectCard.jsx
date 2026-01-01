import React from "react";
import {useNavigate} from "react-router-dom";
import {
	FolderOpen,
	Image,
	Film,
	Calendar,
	Trash2,
	ChevronRight,
} from "lucide-react";
import {Card} from "@components/ui/Card";
import {Badge} from "@components/ui/Badge";
import {Button} from "@components/ui/Button";

const statusBadges = {
	created: {variant: "default", label: "Created"},
	processing: {variant: "warning", label: "Processing"},
	completed: {variant: "success", label: "Completed"},
	error: {variant: "error", label: "Error"},
};

export const ProjectCard = ({project, onDelete}) => {
	const navigate = useNavigate();
	const status = statusBadges[project.status] || statusBadges.created;

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<Card hover onClick={() => navigate(`/projects/${project.id}`)}>
			<div className="p-6">
				{/* Header */}
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
							<FolderOpen className="w-6 h-6 text-gray-900" />
						</div>
						<div>
							<h3 className="font-bold text-white text-lg line-clamp-1">
								{project.name || "Untitled Project"}
							</h3>
							<Badge variant={status.variant}>{status.label}</Badge>
						</div>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 gap-4 mb-4">
					<div className="flex items-center gap-2 text-gray-400">
						<Image className="w-4 h-4" />
						<span className="text-sm">{project.image_count || 0} images</span>
					</div>
					<div className="flex items-center gap-2 text-gray-400">
						<Film className="w-4 h-4" />
						<span className="text-sm">{project.clip_count || 0} clips</span>
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
					<div className="flex items-center gap-2 text-gray-500 text-sm">
						<Calendar className="w-4 h-4" />
						{formatDate(project.created_at)}
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(project.id);
							}}
						>
							<Trash2 className="w-4 h-4 text-red-400" />
						</Button>
						<ChevronRight className="w-5 h-5 text-gray-500" />
					</div>
				</div>
			</div>
		</Card>
	);
};
