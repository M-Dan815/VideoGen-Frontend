// client/src/pages/FeaturesPage.jsx
import {motion} from "framer-motion";
import {
	HiLightningBolt,
	HiSparkles,
	HiClock,
	HiChartBar,
	HiShieldCheck,
	HiCog,
	HiDownload,
	HiGlobe,
	HiPhotograph,
} from "react-icons/hi";
import {Link} from "react-router-dom";
import Button from "@components/ui/Button";

const FeaturesPage = () => {
	const mainFeatures = [
		{
			icon: HiLightningBolt,
			title: "AI-Powered Generation",
			description:
				"State-of-the-art AI models from Luma, Runway, and Sora create stunning cinematic videos from your images.",
			benefits: [
				"Multiple AI engines for best results",
				"Automatic fallback for reliability",
				"Continuous quality improvements",
			],
		},
		{
			icon: HiPhotograph,
			title: "Automatic Image Scraping",
			description:
				"Just paste a realestate.com.au URL and we automatically extract all property images.",
			benefits: [
				"No manual image uploads",
				"Batch processing support",
				"Smart image selection",
			],
		},
		{
			icon: HiSparkles,
			title: "Professional Templates",
			description:
				"Choose from 5+ expertly crafted templates designed specifically for real estate.",
			benefits: [
				"Cinematic camera movements",
				"Smooth transitions",
				"Customizable styles",
			],
		},
		{
			icon: HiClock,
			title: "Real-Time Processing",
			description:
				"Watch your video come to life with live progress updates and status notifications.",
			benefits: [
				"Socket.io real-time updates",
				"Progress tracking",
				"Instant notifications",
			],
		},
		{
			icon: HiDownload,
			title: "Multiple Export Options",
			description:
				"Export in various formats and resolutions to suit any platform or requirement.",
			benefits: [
				"720p, 1080p, and 4K quality",
				"MP4, WebM, and GIF formats",
				"16:9, 9:16, 1:1 aspect ratios",
			],
		},
		{
			icon: HiShieldCheck,
			title: "Enterprise Security",
			description:
				"Bank-level security with encryption, secure storage, and compliance standards.",
			benefits: ["SSL encryption", "Secure AWS S3 storage", "GDPR compliant"],
		},
	];

	const additionalFeatures = [
		{
			icon: HiCog,
			title: "Custom Watermarks",
			description: "Add your brand logo",
		},
		{
			icon: HiChartBar,
			title: "Analytics Dashboard",
			description: "Track performance",
		},
		{icon: HiGlobe, title: "CDN Delivery", description: "Fast global access"},
		{
			icon: HiLightningBolt,
			title: "Priority Queue",
			description: "Faster processing",
		},
	];

	const useCases = [
		{
			title: "Real Estate Agents",
			description:
				"Create stunning property showcase videos that attract more buyers and close deals faster.",
			image: "🏠",
		},
		{
			title: "Property Developers",
			description:
				"Market new developments with professional videos that highlight key features and amenities.",
			image: "🏗️",
		},
		{
			title: "Marketing Agencies",
			description:
				"Deliver high-quality video content for clients without expensive production costs.",
			image: "📱",
		},
		{
			title: "Property Managers",
			description:
				"Quickly create listing videos for rental properties to attract quality tenants.",
			image: "🔑",
		},
	];

	return (
		<div className="bg-white">
			{/* Hero */}
			<section className="section bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
				<div className="container-custom">
					<motion.div
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						className="text-center max-w-3xl mx-auto"
					>
						<h1 className="text-5xl font-bold text-gray-900 mb-4">
							Powerful features for professional videos
						</h1>
						<p className="text-xl text-gray-600 mb-8">
							Everything you need to create, manage, and deliver stunning real
							estate videos at scale
						</p>
						<Link to="/register">
							<Button size="lg">Start Creating Free</Button>
						</Link>
					</motion.div>
				</div>
			</section>

			{/* Main Features */}
			<section className="section">
				<div className="container-custom">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{mainFeatures.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<motion.div
									key={feature.title}
									initial={{opacity: 0, y: 20}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									transition={{delay: index * 0.1}}
									className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-200 hover:shadow-lg transition-all"
								>
									<div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
										<Icon className="w-6 h-6 text-primary-600" />
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-600 mb-4">{feature.description}</p>
									<ul className="space-y-2">
										{feature.benefits.map((benefit) => (
											<li
												key={benefit}
												className="flex items-start gap-2 text-sm text-gray-700"
											>
												<svg
													className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5"
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
												{benefit}
											</li>
										))}
									</ul>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Additional Features Grid */}
			<section className="section bg-gray-50">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">And so much more</h2>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{additionalFeatures.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<motion.div
									key={feature.title}
									initial={{opacity: 0, y: 20}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									transition={{delay: index * 0.1}}
									className="bg-white rounded-xl p-6 text-center border border-gray-200"
								>
									<div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
										<Icon className="w-6 h-6 text-primary-600" />
									</div>
									<h3 className="font-semibold text-gray-900 mb-1">
										{feature.title}
									</h3>
									<p className="text-sm text-gray-600">{feature.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Use Cases */}
			<section className="section">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">Built for professionals</h2>
						<p className="section-subtitle">
							Trusted by real estate professionals worldwide
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{useCases.map((useCase, index) => (
							<motion.div
								key={useCase.title}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: index * 0.1}}
								className="bg-white rounded-xl border border-gray-200 p-8 hover:border-primary-200 hover:shadow-lg transition-all"
							>
								<div className="text-5xl mb-4">{useCase.image}</div>
								<h3 className="text-2xl font-semibold text-gray-900 mb-3">
									{useCase.title}
								</h3>
								<p className="text-gray-600">{useCase.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA */}
			<section className="section bg-primary-600">
				<div className="container-narrow text-center">
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
					>
						<h2 className="text-4xl font-bold text-white mb-4">
							Ready to get started?
						</h2>
						<p className="text-xl text-primary-100 mb-8">
							Create your first video in minutes
						</p>
						<Link to="/register">
							<Button
								size="lg"
								variant="secondary"
								className="bg-white text-primary-600 hover:bg-gray-50"
							>
								Start Free Trial
							</Button>
						</Link>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default FeaturesPage;
