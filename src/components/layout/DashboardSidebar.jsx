// client/src/components/layout/DashboardSidebar.jsx
import {Link, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import {
	HiHome,
	HiFolder,
	HiPhotograph,
	HiCog,
	HiCreditCard,
	HiPlus,
	HiChevronLeft,
	HiChevronRight,
} from "react-icons/hi";
import {useUIStore} from "@store/uiStore";
import {useAuthStore} from "@store/authStore";

const DashboardSidebar = () => {
	const location = useLocation();
	const {sidebarOpen, toggleSidebar} = useUIStore();
	const {user} = useAuthStore();

	const navigation = [
		{name: "Dashboard", href: "/dashboard", icon: HiHome},
		{name: "Projects", href: "/dashboard/projects", icon: HiFolder},
		{name: "Gallery", href: "/dashboard/gallery", icon: HiPhotograph},
	];

	const bottomNavigation = [
		{name: "Billing", href: "/dashboard/billing", icon: HiCreditCard},
		{name: "Settings", href: "/dashboard/settings", icon: HiCog},
	];

	const isActive = (path) => {
		if (path === "/dashboard") {
			return location.pathname === path;
		}
		return location.pathname.startsWith(path);
	};

	return (
		<>
			{/* Mobile Overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
					onClick={toggleSidebar}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300 ${
					sidebarOpen ? "w-64" : "w-20"
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
						{sidebarOpen ? (
							<Link to="/" className="flex items-center gap-2">
								<div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center flex-shrink-0">
									<span className="text-white font-bold text-lg">V</span>
								</div>
								<span className="text-lg font-bold text-gray-900">
									VideoGen AI
								</span>
							</Link>
						) : (
							<Link to="/" className="flex items-center justify-center w-full">
								<div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
									<span className="text-white font-bold text-lg">V</span>
								</div>
							</Link>
						)}
					</div>

					{/* Create Project Button */}
					<div className="p-3">
						<Link to="/dashboard/projects/new">
							<button
								className={`btn-primary w-full ${
									sidebarOpen ? "btn-md" : "btn-sm justify-center"
								}`}
							>
								<HiPlus className="w-5 h-5" />
								{sidebarOpen && <span>New Project</span>}
							</button>
						</Link>
					</div>

					{/* Credits Display */}
					{sidebarOpen && (
						<div className="mx-3 mb-3 p-3 bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200">
							<div className="flex items-center justify-between mb-1">
								<span className="text-xs font-medium text-primary-900">
									Credits
								</span>
								<Link
									to="/dashboard/billing"
									className="text-xs text-primary-600 hover:text-primary-700 font-medium"
								>
									Buy more
								</Link>
							</div>
							<div className="text-2xl font-bold text-primary-700">
								{user?.credits?.balance ?? 0} {/* ← Fixed here */}
							</div>
						</div>
					)}

					{/* Navigation */}
					<nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
						{navigation.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);
							return (
								<Link key={item.name} to={item.href}>
									<div
										className={`sidebar-item ${
											active ? "sidebar-item-active" : ""
										} ${!sidebarOpen && "justify-center"}`}
										title={!sidebarOpen ? item.name : ""}
									>
										<Icon className="w-5 h-5 flex-shrink-0" />
										{sidebarOpen && <span>{item.name}</span>}
									</div>
								</Link>
							);
						})}
					</nav>

					{/* Bottom Navigation */}
					<div className="px-3 py-2 border-t border-gray-200 space-y-1">
						{bottomNavigation.map((item) => {
							const Icon = item.icon;
							const active = isActive(item.href);
							return (
								<Link key={item.name} to={item.href}>
									<div
										className={`sidebar-item ${
											active ? "sidebar-item-active" : ""
										} ${!sidebarOpen && "justify-center"}`}
										title={!sidebarOpen ? item.name : ""}
									>
										<Icon className="w-5 h-5 flex-shrink-0" />
										{sidebarOpen && <span>{item.name}</span>}
									</div>
								</Link>
							);
						})}
					</div>

					{/* Toggle Button */}
					<button
						onClick={toggleSidebar}
						className="hidden lg:flex items-center justify-center h-12 border-t border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
					>
						{sidebarOpen ? (
							<HiChevronLeft className="w-5 h-5" />
						) : (
							<HiChevronRight className="w-5 h-5" />
						)}
					</button>
				</div>
			</aside>
		</>
	);
};

export default DashboardSidebar;
