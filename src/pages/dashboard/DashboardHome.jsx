// client/src/pages/dashboard/DashboardHome.jsx
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {
	HiPlus,
	HiFolder,
	HiClock,
	HiCheckCircle,
	HiXCircle,
	HiTrendingUp,
	HiEye,
	HiDownload,
} from "react-icons/hi";
import PageHeader from "@components/ui/PageHeader";
import Card from "@components/ui/Card";
import Button from "@components/ui/Button";
import Badge from "@components/ui/Badge";
import EmptyState from "@components/ui/EmptyState";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import StatusBadge from "@components/ui/StatusBadge";
import {useAuthStore} from "@store/authStore";
import {useProject} from "@hooks/useProject";
import {formatRelativeTime} from "@utils/formatters";

const DashboardHome = () => {
	const {user} = useAuthStore();
	const {projects, loading, fetchProjects} = useProject();
	const [stats, setStats] = useState({
		total: 0,
		completed: 0,
		processing: 0,
		failed: 0,
	});

	useEffect(() => {
		fetchProjects({limit: 5});
	}, []);

	useEffect(() => {
		if (projects) {
			setStats({
				total: projects.length,
				completed: projects.filter((p) => p.status === "completed").length,
				processing: projects.filter((p) => p.status === "processing").length,
				failed: projects.filter((p) => p.status === "failed").length,
			});
		}
	}, [projects]);

	const statCards = [
		{
			label: "Total Projects",
			value: stats.total,
			icon: HiFolder,
			color: "primary",
			bgColor: "bg-primary-50",
			iconColor: "text-primary-600",
		},
		{
			label: "Completed",
			value: stats.completed,
			icon: HiCheckCircle,
			color: "success",
			bgColor: "bg-success-50",
			iconColor: "text-success-600",
		},
		{
			label: "Processing",
			value: stats.processing,
			icon: HiClock,
			color: "warning",
			bgColor: "bg-warning-50",
			iconColor: "text-warning-600",
		},
		{
			label: "Failed",
			value: stats.failed,
			icon: HiXCircle,
			color: "error",
			bgColor: "bg-error-50",
			iconColor: "text-error-600",
		},
	];

	return (
		<div>
			<PageHeader
				title={`Welcome back, ${user?.name?.split(" ")[0] || "there"}!`}
				subtitle="Here's what's happening with your projects"
				actions={
					<Link to="/dashboard/projects/new">
						<Button>
							<HiPlus className="w-5 h-5" />
							New Project
						</Button>
					</Link>
				}
			/>

			{/* Stats Grid */}
			<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				{statCards.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<motion.div
							key={stat.label}
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
							transition={{delay: index * 0.05}}
						>
							<Card>
								<Card.Body>
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm text-gray-600 mb-1">{stat.label}</p>
											<p className="text-3xl font-bold text-gray-900">
												{stat.value}
											</p>
										</div>
										<div
											className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}
										>
											<Icon className={`w-6 h-6 ${stat.iconColor}`} />
										</div>
									</div>
								</Card.Body>
							</Card>
						</motion.div>
					);
				})}
			</div>

			{/* Quick Actions */}
			<Card className="mb-8">
				<Card.Header>
					<h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
				</Card.Header>
				<Card.Body>
					<div className="grid md:grid-cols-3 gap-4">
						<Link to="/dashboard/projects/new">
							<div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group cursor-pointer">
								<div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
									<HiPlus className="w-5 h-5 text-primary-600" />
								</div>
								<div>
									<p className="font-medium text-gray-900">
										Create New Project
									</p>
									<p className="text-sm text-gray-600">
										Start generating videos
									</p>
								</div>
							</div>
						</Link>

						<Link to="/dashboard/gallery">
							<div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group cursor-pointer">
								<div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
									<HiEye className="w-5 h-5 text-primary-600" />
								</div>
								<div>
									<p className="font-medium text-gray-900">View Gallery</p>
									<p className="text-sm text-gray-600">Browse all videos</p>
								</div>
							</div>
						</Link>

						<Link to="/dashboard/billing">
							<div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group cursor-pointer">
								<div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-200 transition-colors">
									<HiTrendingUp className="w-5 h-5 text-primary-600" />
								</div>
								<div>
									<p className="font-medium text-gray-900">Buy Credits</p>
									<p className="text-sm text-gray-600">Get more credits</p>
								</div>
							</div>
						</Link>
					</div>
				</Card.Body>
			</Card>

			{/* Recent Projects */}
			<Card>
				<Card.Header>
					<div className="flex items-center justify-between">
						<h2 className="text-lg font-semibold text-gray-900">
							Recent Projects
						</h2>
						<Link to="/dashboard/projects">
							<Button variant="ghost" size="sm">
								View All
							</Button>
						</Link>
					</div>
				</Card.Header>
				<Card.Body className="p-0">
					{loading ? (
						<div className="py-12">
							<LoadingSpinner text="Loading projects..." />
						</div>
					) : projects && projects.length > 0 ? (
						<div className="divide-y divide-gray-100">
							{projects.slice(0, 5).map((project) => (
								<Link
									key={project._id}
									to={`/dashboard/projects/${project._id}`}
									className="block hover:bg-gray-50 transition-colors"
								>
									<div className="px-6 py-4">
										<div className="flex items-center justify-between mb-2">
											<h3 className="font-medium text-gray-900">
												{project.title || "Untitled Project"}
											</h3>
											<StatusBadge status={project.status} />
										</div>
										<div className="flex items-center gap-4 text-sm text-gray-600">
											<span>{formatRelativeTime(project.createdAt)}</span>
											<span>•</span>
											<span>{project.template || "Cinematic"}</span>
											{project.status === "completed" && (
												<>
													<span>•</span>
													<button
														onClick={(e) => {
															e.preventDefault();
															// Handle download
														}}
														className="flex items-center gap-1 text-primary-600 hover:text-primary-700"
													>
														<HiDownload className="w-4 h-4" />
														Download
													</button>
												</>
											)}
										</div>
									</div>
								</Link>
							))}
						</div>
					) : (
						<EmptyState
							icon={<HiFolder className="w-8 h-8" />}
							title="No projects yet"
							description="Create your first project to get started"
							action={
								<Link to="/dashboard/projects/new">
									<Button>
										<HiPlus className="w-5 h-5" />
										Create Project
									</Button>
								</Link>
							}
						/>
					)}
				</Card.Body>
			</Card>
		</div>
	);
};

export default DashboardHome;
