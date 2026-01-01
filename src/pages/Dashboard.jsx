import React, {useState} from "react";
import {Plus, FolderOpen, Sparkles} from "lucide-react";
import {useProjects} from "@hooks/useProjects";
import {Button} from "@components/ui/Button";
import {ProjectCard} from "@components/projects/ProjectCard";
import {CreateProjectModal} from "@components/projects/CreateProjectModal";
import {EmptyState} from "@components/ui/EmptyState";
import {LoadingScreen} from "@components/ui/Spinner";

export const Dashboard = () => {
	const {projects, loading, createProject, deleteProject} = useProjects();
	const [showCreateModal, setShowCreateModal] = useState(false);

	if (loading) {
		return <LoadingScreen message="Loading projects..." />;
	}

	return (
		<div className="min-h-screen bg-gray-900">
			{/* Header */}
			<header className="border-b border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
								<Sparkles className="w-6 h-6 text-gray-900" />
							</div>
							<div>
								<h1 className="text-2xl font-bold text-white">
									Video Generator
								</h1>
								<p className="text-gray-400">
									Create stunning property videos with AI
								</p>
							</div>
						</div>
						<Button onClick={() => setShowCreateModal(true)} icon={Plus}>
							New Project
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{projects.length === 0 ? (
					<EmptyState
						icon={FolderOpen}
						title="No projects yet"
						description="Create your first project to start generating amazing property videos with AI."
						action={() => setShowCreateModal(true)}
						actionLabel="Create Your First Project"
						actionIcon={Plus}
					/>
				) : (
					<>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl font-bold text-white">
								Your Projects ({projects.length})
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{projects.map((project) => (
								<ProjectCard
									key={project.id}
									project={project}
									onDelete={deleteProject}
								/>
							))}
						</div>
					</>
				)}
			</main>

			{/* Create Project Modal */}
			<CreateProjectModal
				isOpen={showCreateModal}
				onClose={() => setShowCreateModal(false)}
				onCreate={createProject}
			/>
		</div>
	);
};
