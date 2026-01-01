import React, {useState, useCallback} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
	ArrowLeft,
	Image as ImageIcon,
	Film,
	Video,
	Settings,
	RefreshCw,
} from "lucide-react";
import {useProject} from "@hooks/useProject";
import {useClipPolling} from "@hooks/useClipPolling";
import {Button} from "@components/ui/Button";
import {Card, CardHeader, CardContent} from "@components/ui/Card";
import {Badge} from "@components/ui/Badge";
import {LoadingScreen} from "@components/ui/Spinner";
import {EmptyState} from "@components/ui/EmptyState";
import {ImageUploader} from "@components/images/ImageUploader";
import {ImageGrid} from "@components/images/ImageGrid";
import {ClipCard} from "@components/clips/ClipCard";
import {GenerateClipModal} from "@components/clips/GenerateClipModal";
import {VideoPlayerModal} from "@components/clips/VideoPlayerModal";

export const ProjectDetail = () => {
	const {projectId} = useParams();
	const navigate = useNavigate();

	const {
		project,
		images,
		clips,
		loading,
		uploadImage,
		deleteImage,
		generateClip,
		refreshClip,
		deleteClip,
		refetch,
	} = useProject(projectId);

	const [activeTab, setActiveTab] = useState("images");
	const [selectedImage, setSelectedImage] = useState(null);
	const [showGenerateModal, setShowGenerateModal] = useState(false);
	const [selectedClip, setSelectedClip] = useState(null);
	const [showVideoModal, setShowVideoModal] = useState(false);

	// Get images that are currently generating
	const generatingImageIds = clips
		.filter((c) => c.status === "pending" || c.status === "generating")
		.map((c) => c.image_id);

	// Get images that have completed clips
	const completedImageIds = clips
		.filter((c) => c.status === "completed")
		.map((c) => c.image_id);

	// Handle clip updates from polling
	const handleClipUpdate = useCallback(
		(updatedClip) => {
			refreshClip(updatedClip.id);
		},
		[refreshClip]
	);

	// Setup polling for generating clips
	useClipPolling(projectId, clips, handleClipUpdate);

	const handleOpenGenerateModal = (image) => {
		setSelectedImage(image);
		setShowGenerateModal(true);
	};

	const handlePlayClip = (clip) => {
		setSelectedClip(clip);
		setShowVideoModal(true);
	};

	const handleRegenerateClip = async (clip) => {
		// For now, just regenerate with same settings
		// Could open a modal for new settings
		try {
			await generateClip(clip.image_id, {
				animationShot: clip.animation_shot,
				duration: clip.duration,
			});
		} catch (err) {
			// Error handled in hook
		}
	};

	if (loading) {
		return <LoadingScreen message="Loading project..." />;
	}

	if (!project) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center">
				<EmptyState
					icon={ImageIcon}
					title="Project not found"
					description="The project you're looking for doesn't exist."
					action={() => navigate("/")}
					actionLabel="Go Back"
				/>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-900">
			{/* Header */}
			<header className="border-b border-gray-800 sticky top-0 bg-gray-900/80 backdrop-blur-sm z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Button
								variant="ghost"
								onClick={() => navigate("/")}
								icon={ArrowLeft}
							>
								Back
							</Button>
							<div>
								<h1 className="text-xl font-bold text-white">
									{project.name || "Untitled Project"}
								</h1>
								<div className="flex items-center gap-3 mt-1">
									<Badge variant="primary">
										<ImageIcon className="w-3 h-3 mr-1" />
										{images.length} images
									</Badge>
									<Badge variant="info">
										<Film className="w-3 h-3 mr-1" />
										{clips.length} clips
									</Badge>
								</div>
							</div>
						</div>
						<Button variant="ghost" onClick={refetch} icon={RefreshCw}>
							Refresh
						</Button>
					</div>
				</div>
			</header>

			{/* Tabs */}
			<div className="border-b border-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex gap-1">
						{[
							{id: "images", label: "Images", icon: ImageIcon},
							{id: "clips", label: "Clips", icon: Film},
							{id: "video", label: "Video", icon: Video},
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`
                  flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors
                  ${
										activeTab === tab.id
											? "border-yellow-400 text-yellow-400"
											: "border-transparent text-gray-400 hover:text-white"
									}
                `}
							>
								<tab.icon className="w-4 h-4" />
								{tab.label}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeTab === "images" && (
					<div className="space-y-8">
						{/* Upload Section */}
						<Card>
							<CardHeader>
								<h2 className="text-lg font-bold text-white">Upload Images</h2>
							</CardHeader>
							<CardContent>
								<ImageUploader onUpload={uploadImage} />
							</CardContent>
						</Card>

						{/* Images Grid */}
						{images.length > 0 ? (
							<Card>
								<CardHeader>
									<h2 className="text-lg font-bold text-white">
										Project Images ({images.length})
									</h2>
								</CardHeader>
								<CardContent>
									<ImageGrid
										images={images}
										onGenerateClip={handleOpenGenerateModal}
										onDeleteImage={deleteImage}
										generatingImageIds={generatingImageIds}
										completedImageIds={completedImageIds}
									/>
								</CardContent>
							</Card>
						) : (
							<Card>
								<CardContent>
									<EmptyState
										icon={ImageIcon}
										title="No images yet"
										description="Upload some property images to get started with clip generation."
									/>
								</CardContent>
							</Card>
						)}
					</div>
				)}

				{activeTab === "clips" && (
					<div className="space-y-6">
						{clips.length > 0 ? (
							<>
								{/* Stats */}
								<div className="grid grid-cols-4 gap-4">
									{[
										{
											label: "Total",
											value: clips.length,
											variant: "default",
										},
										{
											label: "Pending",
											value: clips.filter((c) => c.status === "pending").length,
											variant: "warning",
										},
										{
											label: "Completed",
											value: clips.filter((c) => c.status === "completed")
												.length,
											variant: "success",
										},
										{
											label: "Failed",
											value: clips.filter((c) => c.status === "error").length,
											variant: "error",
										},
									].map((stat) => (
										<Card key={stat.label}>
											<CardContent className="text-center py-4">
												<p className="text-3xl font-bold text-white">
													{stat.value}
												</p>
												<p className="text-gray-400 text-sm">{stat.label}</p>
											</CardContent>
										</Card>
									))}
								</div>

								{/* Clips Grid */}
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
									{clips.map((clip) => (
										<ClipCard
											key={clip.id}
											clip={clip}
											onPlay={handlePlayClip}
											onRegenerate={handleRegenerateClip}
											onDelete={deleteClip}
										/>
									))}
								</div>
							</>
						) : (
							<Card>
								<CardContent>
									<EmptyState
										icon={Film}
										title="No clips yet"
										description="Generate clips from your uploaded images in the Images tab."
										action={() => setActiveTab("images")}
										actionLabel="Go to Images"
										actionIcon={ImageIcon}
									/>
								</CardContent>
							</Card>
						)}
					</div>
				)}

				{activeTab === "video" && (
					<Card>
						<CardContent>
							<EmptyState
								icon={Video}
								title="Coming Soon"
								description="Video composition features will be available soon. Generate clips first!"
							/>
						</CardContent>
					</Card>
				)}
			</main>

			{/* Modals */}
			<GenerateClipModal
				isOpen={showGenerateModal}
				onClose={() => setShowGenerateModal(false)}
				image={selectedImage}
				onGenerate={generateClip}
			/>

			<VideoPlayerModal
				isOpen={showVideoModal}
				onClose={() => setShowVideoModal(false)}
				clip={selectedClip}
			/>
		</div>
	);
};
