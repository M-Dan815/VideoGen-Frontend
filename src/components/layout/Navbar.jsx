// client/src/components/layout/Navbar.jsx
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {HiMenu, HiX, HiChevronDown} from "react-icons/hi";
import {useAuthStore} from "@store/authStore";
import Button from "@components/ui/Button";

const Navbar = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();
	const {isAuthenticated, user} = useAuthStore();

	const navigation = [
		{name: "Features", href: "/features"},
		{name: "Pricing", href: "/pricing"},
		{name: "Documentation", href: "#"},
		{name: "Blog", href: "#"},
	];

	const isActive = (path) => location.pathname === path;

	return (
		<nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
			<div className="container-custom">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-lg">V</span>
						</div>
						<span className="text-xl font-bold text-gray-900">VideoGen AI</span>
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center gap-1">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`nav-link ${
									isActive(item.href) ? "nav-link-active" : ""
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>

					{/* Auth Buttons */}
					<div className="hidden md:flex items-center gap-3">
						{isAuthenticated ? (
							<>
								<Link to="/dashboard">
									<Button variant="secondary" size="sm">
										Dashboard
									</Button>
								</Link>
								<Link to="/dashboard/projects/new">
									<Button size="sm">Create Video</Button>
								</Link>
							</>
						) : (
							<>
								<Link to="/login">
									<Button variant="ghost" size="sm">
										Sign In
									</Button>
								</Link>
								<Link to="/register">
									<Button size="sm">Get Started</Button>
								</Link>
							</>
						)}
					</div>

					{/* Mobile Menu Button */}
					<button
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className="md:hidden p-2 text-gray-600 hover:text-gray-900"
					>
						{mobileMenuOpen ? (
							<HiX className="w-6 h-6" />
						) : (
							<HiMenu className="w-6 h-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						initial={{opacity: 0, height: 0}}
						animate={{opacity: 1, height: "auto"}}
						exit={{opacity: 0, height: 0}}
						className="md:hidden border-t border-gray-200 bg-white"
					>
						<div className="container-custom py-4 space-y-2">
							{navigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.name}
								</Link>
							))}
							<div className="pt-4 space-y-2">
								{isAuthenticated ? (
									<>
										<Link
											to="/dashboard"
											onClick={() => setMobileMenuOpen(false)}
										>
											<Button variant="secondary" className="w-full">
												Dashboard
											</Button>
										</Link>
										<Link
											to="/dashboard/projects/new"
											onClick={() => setMobileMenuOpen(false)}
										>
											<Button className="w-full">Create Video</Button>
										</Link>
									</>
								) : (
									<>
										<Link to="/login" onClick={() => setMobileMenuOpen(false)}>
											<Button variant="secondary" className="w-full">
												Sign In
											</Button>
										</Link>
										<Link
											to="/register"
											onClick={() => setMobileMenuOpen(false)}
										>
											<Button className="w-full">Get Started</Button>
										</Link>
									</>
								)}
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
