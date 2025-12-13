// client/src/components/layout/AuthLayout.jsx
import {Outlet, Link} from "react-router-dom";
import {motion} from "framer-motion";

const AuthLayout = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Left Side - Branding */}
			<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 p-12 flex-col justify-between relative overflow-hidden">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
					<div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
				</div>

				{/* Logo */}
				<Link to="/" className="flex items-center gap-2 relative z-10">
					<div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
						<span className="text-primary-600 font-bold text-xl">V</span>
					</div>
					<span className="text-2xl font-bold text-white">VideoGen AI</span>
				</Link>

				{/* Content */}
				<motion.div
					initial={{opacity: 0, y: 20}}
					animate={{opacity: 1, y: 0}}
					transition={{delay: 0.2}}
					className="relative z-10"
				>
					<h1 className="text-4xl font-bold text-white mb-4">
						Transform Real Estate Images into Stunning Videos
					</h1>
					<p className="text-lg text-primary-100 mb-8">
						Create professional, cinematic property videos in minutes with
						AI-powered technology.
					</p>

					{/* Features */}
					<div className="space-y-4">
						{[
							"AI-powered video generation",
							"Professional templates",
							"Real-time processing updates",
							"Export in multiple formats",
						].map((feature, index) => (
							<motion.div
								key={feature}
								initial={{opacity: 0, x: -20}}
								animate={{opacity: 1, x: 0}}
								transition={{delay: 0.3 + index * 0.1}}
								className="flex items-center gap-3"
							>
								<div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
									<svg
										className="w-4 h-4 text-white"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<span className="text-white">{feature}</span>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Bottom Quote */}
				<div className="relative z-10 border-l-4 border-white/30 pl-4">
					<p className="text-white/90 italic mb-2">
						"This platform has revolutionized how we showcase properties to
						clients. Absolutely game-changing!"
					</p>
					<p className="text-white/70 text-sm">— Real Estate Agency</p>
				</div>
			</div>

			{/* Right Side - Auth Form */}
			<div className="flex-1 flex items-center justify-center p-6">
				<div className="w-full max-w-md">
					{/* Mobile Logo */}
					<Link
						to="/"
						className="flex lg:hidden items-center gap-2 mb-8 justify-center"
					>
						<div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-lg">V</span>
						</div>
						<span className="text-xl font-bold text-gray-900">VideoGen AI</span>
					</Link>

					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
