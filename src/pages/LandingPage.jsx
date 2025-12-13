// client/src/pages/LandingPage.jsx
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {
	HiPlay,
	HiLightningBolt,
	HiClock,
	HiSparkles,
	HiCheckCircle,
	HiArrowRight,
} from "react-icons/hi";
import Button from "@components/ui/Button";
import {VIDEO_TEMPLATES} from "@utils/constants";

const LandingPage = () => {
	const features = [
		{
			icon: HiLightningBolt,
			title: "AI-Powered Generation",
			description:
				"Advanced AI models create stunning videos from your real estate images in seconds.",
		},
		{
			icon: HiClock,
			title: "Save Time",
			description:
				"Generate professional property videos in minutes, not hours or days.",
		},
		{
			icon: HiSparkles,
			title: "Professional Quality",
			description:
				"Cinematic camera movements and smooth transitions that impress clients.",
		},
		{
			icon: HiPlay,
			title: "Multiple Templates",
			description:
				"Choose from 5+ professional templates designed for real estate showcase.",
		},
	];

	const stats = [
		{label: "Videos Created", value: "10,000+"},
		{label: "Happy Customers", value: "2,500+"},
		{label: "Time Saved", value: "50,000+ hrs"},
		{label: "Success Rate", value: "99.8%"},
	];

	const testimonials = [
		{
			name: "Sarah Johnson",
			role: "Real Estate Agent",
			company: "Premium Properties",
			avatar: null,
			content:
				"This platform has completely transformed how I showcase properties. My listings get 3x more engagement now!",
		},
		{
			name: "Michael Chen",
			role: "Marketing Director",
			company: "Urban Realty Group",
			avatar: null,
			content:
				"The quality is incredible and the time savings are massive. Best investment for our marketing team.",
		},
		{
			name: "Emily Davis",
			role: "Property Developer",
			company: "Skyline Developments",
			avatar: null,
			content:
				"Professional cinematic videos in minutes. Our clients are blown away every single time.",
		},
	];

	return (
		<div className="bg-white">
			{/* Hero Section */}
			<section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
				<div className="container-custom py-20 lg:py-28">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Content */}
						<motion.div
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
							transition={{duration: 0.6}}
						>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full mb-6">
								<HiSparkles className="w-4 h-4 text-primary-600" />
								<span className="text-sm font-medium text-primary-700">
									AI-Powered Video Generation
								</span>
							</div>

							<h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
								Transform Images into{" "}
								<span className="text-gradient">Cinematic Videos</span>
							</h1>

							<p className="text-xl text-gray-600 mb-8 leading-relaxed">
								Create stunning real estate videos in minutes with AI. Just
								paste a property URL and let our AI do the magic.
							</p>

							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<Link to="/register">
									<Button size="lg" className="w-full sm:w-auto">
										Start Creating Free
										<HiArrowRight className="w-5 h-5" />
									</Button>
								</Link>
								<Link to="#demo">
									<Button
										size="lg"
										variant="secondary"
										className="w-full sm:w-auto"
									>
										<HiPlay className="w-5 h-5" />
										Watch Demo
									</Button>
								</Link>
							</div>

							<div className="flex items-center gap-6 text-sm text-gray-600">
								<div className="flex items-center gap-2">
									<HiCheckCircle className="w-5 h-5 text-success-600" />
									<span>No credit card required</span>
								</div>
								<div className="flex items-center gap-2">
									<HiCheckCircle className="w-5 h-5 text-success-600" />
									<span>25 free credits</span>
								</div>
							</div>
						</motion.div>

						{/* Right Content - Demo Video Placeholder */}
						<motion.div
							initial={{opacity: 0, x: 20}}
							animate={{opacity: 1, x: 0}}
							transition={{duration: 0.6, delay: 0.2}}
							className="relative"
						>
							<div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
								<div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
									<div className="text-center">
										<div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
											<HiPlay className="w-10 h-10 text-primary-600 ml-1" />
										</div>
										<p className="text-gray-600 font-medium">
											Watch Demo Video
										</p>
									</div>
								</div>
							</div>

							{/* Floating Stats */}
							<motion.div
								initial={{opacity: 0, y: 20}}
								animate={{opacity: 1, y: 0}}
								transition={{delay: 0.8}}
								className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-gray-200"
							>
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
										<HiCheckCircle className="w-6 h-6 text-success-600" />
									</div>
									<div>
										<p className="text-2xl font-bold text-gray-900">10,000+</p>
										<p className="text-sm text-gray-600">Videos created</p>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="border-y border-gray-200 bg-white py-12">
				<div className="container-custom">
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: index * 0.1}}
								className="text-center"
							>
								<p className="text-4xl font-bold text-gray-900 mb-1">
									{stat.value}
								</p>
								<p className="text-gray-600">{stat.label}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="section bg-gray-50">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">
							Everything you need to create amazing videos
						</h2>
						<p className="section-subtitle">
							Powerful features designed for real estate professionals
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<motion.div
									key={feature.title}
									initial={{opacity: 0, y: 20}}
									whileInView={{opacity: 1, y: 0}}
									viewport={{once: true}}
									transition={{delay: index * 0.1}}
									className="bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-200 hover:shadow-lg transition-all duration-200"
								>
									<div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
										<Icon className="w-6 h-6 text-primary-600" />
									</div>
									<h3 className="text-lg font-semibold text-gray-900 mb-2">
										{feature.title}
									</h3>
									<p className="text-gray-600">{feature.description}</p>
								</motion.div>
							);
						})}
					</div>
				</div>
			</section>

			{/* Templates Section */}
			<section className="section">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">Professional Video Templates</h2>
						<p className="section-subtitle">
							Choose from our collection of expertly crafted templates
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{VIDEO_TEMPLATES.slice(0, 6).map((template, index) => (
							<motion.div
								key={template.id}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: index * 0.1}}
								className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 hover:shadow-lg transition-all duration-200"
							>
								<div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
									{template.icon}
								</div>
								<div className="p-5">
									<div className="flex items-start justify-between mb-2">
										<h3 className="text-lg font-semibold text-gray-900">
											{template.name}
										</h3>
										<span className="text-sm font-medium text-primary-600">
											{template.credits} credit{template.credits > 1 ? "s" : ""}
										</span>
									</div>
									<p className="text-gray-600 text-sm mb-3">
										{template.description}
									</p>
									<div className="flex items-center justify-between">
										<span className="text-sm text-gray-500">
											Duration: {template.duration}
										</span>
										<button className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
											Preview →
										</button>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="section bg-gray-50">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">How it works</h2>
						<p className="section-subtitle">
							Create professional videos in three simple steps
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{[
							{
								step: "1",
								title: "Paste Property URL",
								description:
									"Simply paste a link from realestate.com.au and we'll scrape all the images.",
							},
							{
								step: "2",
								title: "Choose Template",
								description:
									"Select from our professional templates or customize the style you want.",
							},
							{
								step: "3",
								title: "Generate Video",
								description:
									"Our AI creates your video in minutes. Download and share instantly.",
							},
						].map((item, index) => (
							<motion.div
								key={item.step}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: index * 0.2}}
								className="relative"
							>
								<div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
									<div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
										{item.step}
									</div>
									<h3 className="text-xl font-semibold text-gray-900 mb-3">
										{item.title}
									</h3>
									<p className="text-gray-600">{item.description}</p>
								</div>
								{index < 2 && (
									<div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300" />
								)}
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="section">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">
							Loved by real estate professionals
						</h2>
						<p className="section-subtitle">
							See what our customers have to say
						</p>
					</div>

					<div className="grid md:grid-cols-3 gap-8">
						{testimonials.map((testimonial, index) => (
							<motion.div
								key={testimonial.name}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: index * 0.1}}
								className="bg-white rounded-xl p-6 border border-gray-200"
							>
								<div className="flex items-center gap-1 mb-4">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className="w-5 h-5 text-warning-500"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
								<p className="text-gray-700 mb-6 italic">
									"{testimonial.content}"
								</p>
								<div className="flex items-center gap-3">
									<div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
										<span className="text-gray-600 font-medium">
											{testimonial.name
												.split(" ")
												.map((n) => n[0])
												.join("")}
										</span>
									</div>
									<div>
										<p className="font-semibold text-gray-900">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-600">
											{testimonial.role}, {testimonial.company}
										</p>
									</div>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="section bg-gradient-to-br from-primary-600 to-primary-700">
				<div className="container-narrow text-center">
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
					>
						<h2 className="text-4xl font-bold text-white mb-4">
							Ready to transform your listings?
						</h2>
						<p className="text-xl text-primary-100 mb-8">
							Join thousands of real estate professionals creating stunning
							videos
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Link to="/register">
								<Button
									size="lg"
									variant="secondary"
									className="w-full sm:w-auto bg-white text-primary-600 hover:bg-gray-50"
								>
									Get Started Free
									<HiArrowRight className="w-5 h-5" />
								</Button>
							</Link>
							<Link to="/pricing">
								<Button
									size="lg"
									className="w-full sm:w-auto bg-primary-700 hover:bg-primary-800 border-2 border-white/20"
								>
									View Pricing
								</Button>
							</Link>
						</div>

						<p className="text-primary-100 text-sm mt-6">
							No credit card required • 25 free credits • Cancel anytime
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default LandingPage;
