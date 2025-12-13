// client/src/pages/PricingPage.jsx
import {useState} from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {HiCheck, HiX, HiLightningBolt} from "react-icons/hi";
import Button from "@components/ui/Button";
import {SUBSCRIPTION_PLANS} from "@utils/constants";
import {formatCurrency} from "@utils/formatters";

const PricingPage = () => {
	const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or annual

	const faqs = [
		{
			question: "How do credits work?",
			answer:
				"Each video generation consumes credits based on duration and template. Basic 8s videos cost 1 credit, while premium templates may cost 2-6 credits.",
		},
		{
			question: "Can I cancel anytime?",
			answer:
				"Yes! You can cancel your subscription at any time. Your plan will remain active until the end of your billing period.",
		},
		{
			question: "What happens to unused credits?",
			answer:
				"Credits roll over to the next month as long as you maintain an active subscription. If you cancel, unused credits expire at the end of the billing period.",
		},
		{
			question: "Do you offer refunds?",
			answer:
				"We offer a 14-day money-back guarantee. If you're not satisfied, contact us for a full refund within 14 days of purchase.",
		},
		{
			question: "Can I upgrade or downgrade my plan?",
			answer:
				"Yes! You can change your plan at any time. Upgrades are instant, and downgrades take effect at the next billing cycle.",
		},
		{
			question: "Is there a free trial?",
			answer:
				"Every new account gets 25 free credits to try the platform. No credit card required to start!",
		},
	];

	const comparisonFeatures = [
		{
			category: "Video Generation",
			features: [
				{
					name: "AI Engine",
					starter: "Luma",
					creator: "Luma + Backup",
					pro: "Veo 3",
					business: "Sora 2",
				},
				{
					name: "Monthly Credits",
					starter: "25",
					creator: "70",
					pro: "160",
					business: "350",
				},
				{
					name: "Video Quality",
					starter: "1080p",
					creator: "1080p",
					pro: "4K",
					business: "4K",
				},
				{
					name: "Templates",
					starter: "3 Basic",
					creator: "All 5",
					pro: "All 5 + Custom",
					business: "Unlimited",
				},
				{
					name: "Processing Priority",
					starter: false,
					creator: true,
					pro: true,
					business: true,
				},
			],
		},
		{
			category: "Features",
			features: [
				{
					name: "Custom Watermark",
					starter: true,
					creator: true,
					pro: true,
					business: true,
				},
				{
					name: "Background Music",
					starter: false,
					creator: true,
					pro: true,
					business: true,
				},
				{
					name: "Advanced Enhancements",
					starter: false,
					creator: false,
					pro: true,
					business: true,
				},
				{
					name: "Batch Processing",
					starter: false,
					creator: false,
					pro: true,
					business: true,
				},
				{
					name: "API Access",
					starter: false,
					creator: false,
					pro: false,
					business: true,
				},
				{
					name: "Team Accounts",
					starter: false,
					creator: false,
					pro: false,
					business: true,
				},
			],
		},
		{
			category: "Support",
			features: [
				{
					name: "Email Support",
					starter: "Standard",
					creator: "Priority",
					pro: "Priority",
					business: "Dedicated",
				},
				{
					name: "Response Time",
					starter: "48h",
					creator: "24h",
					pro: "12h",
					business: "4h",
				},
				{
					name: "Video Tutorials",
					starter: true,
					creator: true,
					pro: true,
					business: true,
				},
				{
					name: "Onboarding Call",
					starter: false,
					creator: false,
					pro: true,
					business: true,
				},
			],
		},
	];

	return (
		<div className="bg-white">
			{/* Header */}
			<section className="section bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
				<div className="container-custom">
					<div className="text-center max-w-3xl mx-auto">
						<motion.div
							initial={{opacity: 0, y: 20}}
							animate={{opacity: 1, y: 0}}
						>
							<h1 className="text-5xl font-bold text-gray-900 mb-4">
								Simple, transparent pricing
							</h1>
							<p className="text-xl text-gray-600 mb-8">
								Choose the perfect plan for your needs. Start free, upgrade
								anytime.
							</p>

							{/* Billing Toggle */}
							<div className="inline-flex items-center gap-3 p-1 bg-gray-100 rounded-lg">
								<button
									onClick={() => setBillingCycle("monthly")}
									className={`px-6 py-2 rounded-md font-medium transition-all ${
										billingCycle === "monthly"
											? "bg-white text-gray-900 shadow-sm"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Monthly
								</button>
								<button
									onClick={() => setBillingCycle("annual")}
									className={`px-6 py-2 rounded-md font-medium transition-all ${
										billingCycle === "annual"
											? "bg-white text-gray-900 shadow-sm"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Annual
									<span className="ml-2 text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded-full">
										Save 20%
									</span>
								</button>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="section">
				<div className="container-custom">
					<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
						{SUBSCRIPTION_PLANS.map((plan, index) => {
							const price =
								billingCycle === "annual"
									? Math.floor(plan.price * 0.8)
									: plan.price;

							return (
								<motion.div
									key={plan.id}
									initial={{opacity: 0, y: 20}}
									animate={{opacity: 1, y: 0}}
									transition={{delay: index * 0.1}}
									className={`relative bg-white rounded-2xl border-2 p-8 ${
										plan.popular
											? "border-primary-500 shadow-xl scale-105"
											: "border-gray-200"
									}`}
								>
									{plan.popular && (
										<div className="absolute -top-4 left-1/2 -translate-x-1/2">
											<span className="inline-flex items-center gap-1 px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
												<HiLightningBolt className="w-4 h-4" />
												Most Popular
											</span>
										</div>
									)}

									<div className="text-center mb-6">
										<h3 className="text-2xl font-bold text-gray-900 mb-2">
											{plan.name}
										</h3>
										<div className="flex items-baseline justify-center gap-1 mb-1">
											<span className="text-5xl font-bold text-gray-900">
												${price}
											</span>
											<span className="text-gray-600">/month</span>
										</div>
										{billingCycle === "annual" && (
											<p className="text-sm text-success-600 font-medium">
												Save ${(plan.price - price) * 12}/year
											</p>
										)}
										<p className="text-gray-600 mt-2">
											{plan.credits} credits/month
										</p>
									</div>

									<Link to="/register">
										<Button
											variant={plan.popular ? "primary" : "secondary"}
											className="w-full mb-6"
										>
											Get Started
										</Button>
									</Link>

									<ul className="space-y-3">
										{plan.features.map((feature) => (
											<li key={feature} className="flex items-start gap-3">
												<HiCheck className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
												<span className="text-sm text-gray-700">{feature}</span>
											</li>
										))}
									</ul>
								</motion.div>
							);
						})}
					</div>

					{/* Enterprise */}
					<motion.div
						initial={{opacity: 0, y: 20}}
						whileInView={{opacity: 1, y: 0}}
						viewport={{once: true}}
						className="mt-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center"
					>
						<h3 className="text-3xl font-bold text-white mb-4">Enterprise</h3>
						<p className="text-gray-300 mb-6 max-w-2xl mx-auto">
							Custom solutions for large teams and agencies. White-label
							options, dedicated support, and volume pricing available.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								variant="secondary"
								size="lg"
								className="bg-white text-gray-900"
							>
								Contact Sales
							</Button>
							<Button
								size="lg"
								className="bg-gray-700 hover:bg-gray-600 border border-gray-600"
							>
								Schedule Demo
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Comparison Table */}
			<section className="section bg-gray-50">
				<div className="container-custom">
					<div className="section-header">
						<h2 className="section-title">Compare plans</h2>
						<p className="section-subtitle">
							Find the perfect plan with all the features you need
						</p>
					</div>

					<div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left py-4 px-6 font-semibold text-gray-900">
											Features
										</th>
										{SUBSCRIPTION_PLANS.map((plan) => (
											<th
												key={plan.id}
												className="py-4 px-6 font-semibold text-gray-900 text-center"
											>
												{plan.name}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{comparisonFeatures.map((category) => (
										<>
											<tr key={category.category} className="bg-gray-50">
												<td
													colSpan={5}
													className="py-3 px-6 font-semibold text-gray-900 text-sm"
												>
													{category.category}
												</td>
											</tr>
											{category.features.map((feature) => (
												<tr
													key={feature.name}
													className="border-b border-gray-100"
												>
													<td className="py-4 px-6 text-gray-700">
														{feature.name}
													</td>
													<td className="py-4 px-6 text-center">
														{typeof feature.starter === "boolean" ? (
															feature.starter ? (
																<HiCheck className="w-5 h-5 text-success-600 mx-auto" />
															) : (
																<HiX className="w-5 h-5 text-gray-300 mx-auto" />
															)
														) : (
															<span className="text-gray-700">
																{feature.starter}
															</span>
														)}
													</td>
													<td className="py-4 px-6 text-center">
														{typeof feature.creator === "boolean" ? (
															feature.creator ? (
																<HiCheck className="w-5 h-5 text-success-600 mx-auto" />
															) : (
																<HiX className="w-5 h-5 text-gray-300 mx-auto" />
															)
														) : (
															<span className="text-gray-700">
																{feature.creator}
															</span>
														)}
													</td>
													<td className="py-4 px-6 text-center">
														{typeof feature.pro === "boolean" ? (
															feature.pro ? (
																<HiCheck className="w-5 h-5 text-success-600 mx-auto" />
															) : (
																<HiX className="w-5 h-5 text-gray-300 mx-auto" />
															)
														) : (
															<span className="text-gray-700">
																{feature.pro}
															</span>
														)}
													</td>
													<td className="py-4 px-6 text-center">
														{typeof feature.business === "boolean" ? (
															feature.business ? (
																<HiCheck className="w-5 h-5 text-success-600 mx-auto" />
															) : (
																<HiX className="w-5 h-5 text-gray-300 mx-auto" />
															)
														) : (
															<span className="text-gray-700">
																{feature.business}
															</span>
														)}
													</td>
												</tr>
											))}
										</>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>

			{/* FAQs */}
			<section className="section">
				<div className="container-narrow">
					<div className="section-header">
						<h2 className="section-title">Frequently asked questions</h2>
						<p className="section-subtitle">
							Everything you need to know about pricing
						</p>
					</div>

					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<motion.div
								key={index}
								initial={{opacity: 0, y: 20}}
								whileInView={{opacity: 1, y: 0}}
								viewport={{once: true}}
								transition={{delay: index * 0.05}}
								className="bg-white rounded-xl border border-gray-200 p-6"
							>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{faq.question}
								</h3>
								<p className="text-gray-600">{faq.answer}</p>
							</motion.div>
						))}
					</div>

					<div className="text-center mt-12">
						<p className="text-gray-600 mb-4">Still have questions?</p>
						<Button variant="secondary">Contact Support</Button>
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
							Start creating today
						</h2>
						<p className="text-xl text-primary-100 mb-8">
							Join thousands of professionals transforming their real estate
							listings
						</p>
						<Link to="/register">
							<Button
								size="lg"
								variant="secondary"
								className="bg-white text-primary-600 hover:bg-gray-50"
							>
								Get Started Free
							</Button>
						</Link>
						<p className="text-primary-100 text-sm mt-4">
							25 free credits • No credit card required
						</p>
					</motion.div>
				</div>
			</section>
		</div>
	);
};

export default PricingPage;
