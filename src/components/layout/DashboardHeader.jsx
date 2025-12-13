// client/src/components/layout/DashboardHeader.jsx
import {useState, useRef, useEffect} from "react";
import {Link} from "react-router-dom";
import {motion, AnimatePresence} from "framer-motion";
import {
	HiMenu,
	HiSearch,
	HiBell,
	HiUser,
	HiLogout,
	HiCog,
	HiCreditCard,
} from "react-icons/hi";
import {useUIStore} from "@store/uiStore";
import {useAuth} from "@hooks/useAuth";
import Avatar from "@components/ui/Avatar";

const DashboardHeader = () => {
	const {toggleSidebar} = useUIStore();
	const {user, logout} = useAuth();
	const [userMenuOpen, setUserMenuOpen] = useState(false);
	const [notificationsOpen, setNotificationsOpen] = useState(false);
	const userMenuRef = useRef(null);
	const notificationsRef = useRef(null);

	// Close dropdowns when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
				setUserMenuOpen(false);
			}
			if (
				notificationsRef.current &&
				!notificationsRef.current.contains(event.target)
			) {
				setNotificationsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const notifications = [
		{
			id: 1,
			title: "Video completed",
			message: 'Your project "Modern Villa" is ready',
			time: "5 min ago",
			unread: true,
		},
		{
			id: 2,
			title: "Credits added",
			message: "50 credits added to your account",
			time: "2 hours ago",
			unread: true,
		},
	];

	return (
		<header className="navbar">
			{/* Left */}
			<div className="flex items-center gap-4">
				{/* Mobile Menu Toggle */}
				<button
					onClick={toggleSidebar}
					className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
				>
					<HiMenu className="w-6 h-6" />
				</button>

				{/* Search */}
				<div className="hidden md:block relative">
					<HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search projects..."
						className="pl-10 pr-4 py-2 w-80 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
					/>
				</div>
			</div>

			{/* Right */}
			<div className="flex items-center gap-3">
				{/* Notifications */}
				<div className="relative" ref={notificationsRef}>
					<button
						onClick={() => setNotificationsOpen(!notificationsOpen)}
						className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<HiBell className="w-6 h-6" />
						{notifications.some((n) => n.unread) && (
							<span className="absolute top-1 right-1 w-2 h-2 bg-error-500 rounded-full"></span>
						)}
					</button>

					{/* Notifications Dropdown */}
					<AnimatePresence>
						{notificationsOpen && (
							<motion.div
								initial={{opacity: 0, y: 10}}
								animate={{opacity: 1, y: 0}}
								exit={{opacity: 0, y: 10}}
								className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-dropdown border border-gray-200 overflow-hidden"
							>
								<div className="px-4 py-3 border-b border-gray-200">
									<h3 className="font-semibold text-gray-900">Notifications</h3>
								</div>
								<div className="max-h-96 overflow-y-auto">
									{notifications.map((notification) => (
										<div
											key={notification.id}
											className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
												notification.unread ? "bg-primary-50/50" : ""
											}`}
										>
											<div className="flex items-start gap-3">
												{notification.unread && (
													<span className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
												)}
												<div className="flex-1 min-w-0">
													<p className="text-sm font-medium text-gray-900">
														{notification.title}
													</p>
													<p className="text-sm text-gray-600 mt-0.5">
														{notification.message}
													</p>
													<p className="text-xs text-gray-500 mt-1">
														{notification.time}
													</p>
												</div>
											</div>
										</div>
									))}
								</div>
								<div className="px-4 py-2 text-center border-t border-gray-200">
									<button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
										View all notifications
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>

				{/* User Menu */}
				<div className="relative" ref={userMenuRef}>
					<button
						onClick={() => setUserMenuOpen(!userMenuOpen)}
						className="flex items-center gap-2 p-1 pr-3 rounded-lg hover:bg-gray-100 transition-colors"
					>
						<Avatar src={user?.avatar} name={user?.name} size="sm" />
						<div className="hidden md:block text-left">
							<p className="text-sm font-medium text-gray-900">{user?.name}</p>
							<p className="text-xs text-gray-500">{user?.email}</p>
						</div>
					</button>

					{/* User Dropdown */}
					<AnimatePresence>
						{userMenuOpen && (
							<motion.div
								initial={{opacity: 0, y: 10}}
								animate={{opacity: 1, y: 0}}
								exit={{opacity: 0, y: 10}}
								className="dropdown-menu right-0 mt-2"
							>
								<div className="px-4 py-3 border-b border-gray-200">
									<p className="text-sm font-medium text-gray-900">
										{user?.name}
									</p>
									<p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
								</div>

								<Link
									to="/dashboard/settings"
									onClick={() => setUserMenuOpen(false)}
								>
									<div className="dropdown-item">
										<HiCog className="w-4 h-4" />
										<span>Settings</span>
									</div>
								</Link>

								<Link
									to="/dashboard/billing"
									onClick={() => setUserMenuOpen(false)}
								>
									<div className="dropdown-item">
										<HiCreditCard className="w-4 h-4" />
										<span>Billing</span>
									</div>
								</Link>

								<div className="dropdown-divider" />

								<button
									onClick={() => {
										logout();
										setUserMenuOpen(false);
									}}
									className="dropdown-item-danger w-full"
								>
									<HiLogout className="w-4 h-4" />
									<span>Sign Out</span>
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</header>
	);
};

export default DashboardHeader;
