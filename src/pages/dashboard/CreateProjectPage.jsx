// client/src/pages/dashboard/CreateProjectPage.jsx
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {
	HiLink,
	HiPhotograph,
	HiLightningBolt,
	HiArrowRight,
} from "react-icons/hi";
import PageHeader from "@components/ui/PageHeader";
import Card from "@components/ui/Card";
import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Textarea from "@components/ui/Textarea";
import Button from "@components/ui/Button";
import Alert from "@components/ui/Alert";
import LoadingSpinner from "@components/ui/LoadingSpinner";
import {VIDEO_TEMPLATES, ASPECT_RATIOS} from "@utils/constants";
import {validateRealEstateUrl} from "@utils/validators";
import {useProject} from "@hooks/useProject";
import {useAuthStore} from "@store/authStore";
import toast from "react-hot-toast";

const CreateProjectPage = () => {
	const navigate = useNavigate();
	const {user} = useAuthStore();
	const {scrapeImages, createProject} = useProject();

	const [step, setStep] = useState(1); // 1: URL Input, 2: Configure, 3: Review
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		url: "",
		title: "",
		template: "cinematic",
		aspectRatio: "16:9",
		quality: "1080p",
		description: "",
	});
	const [scrapedImages, setScrapedImages] = useState([]);
	const [selectedImages, setSelectedImages] = useState([]);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setFormData((prev) => ({...prev, [name]: value}));
		if (errors[name]) {
			setErrors((prev) => ({...prev, [name]: ""}));
		}
	};

	const handleScrapeImages = async () => {
		setErrors({});

		if (!formData.url) {
			setErrors({url: "URL is required"});
			return;
		}

		if (!validateRealEstateUrl(formData.url)) {
			setErrors({url: "Please enter a valid realestate.com.au URL"});
			return;
		}

		setLoading(true);
		const result = await scrapeImages(formData.url);
		setLoading(false);

		if (result.success) {
			setScrapedImages(result.data);
			setSelectedImages(result.data.map((img) => img.id));
			setStep(2);
		}
	};

	const handleCreateProject = async () => {
		if (selectedImages.length === 0) {
			toast.error("Please select at least one image");
			return;
		}

		const selectedTemplate = VIDEO_TEMPLATES.find(
			(t) => t.id === formData.template
		);

		if (user.credits.balance < selectedTemplate.credits) {
			toast.error("Insufficient credits");
			return;
		}

		setLoading(true);
		const result = await createProject({
			title:
				formData.title || `Property Video - ${new Date().toLocaleDateString()}`,
			url: formData.url,
			images: selectedImages,
			template: formData.template,
			aspectRatio: formData.aspectRatio,
			quality: formData.quality,
			description: formData.description,
		});
		setLoading(false);

		if (result.success) {
			navigate(`/dashboard/projects/${result.data._id}`);
		}
	};

	const toggleImageSelection = (imageId) => {
		setSelectedImages((prev) =>
			prev.includes(imageId)
				? prev.filter((id) => id !== imageId)
				: [...prev, imageId]
		);
	};

	const selectedTemplate = VIDEO_TEMPLATES.find(
		(t) => t.id === formData.template
	);
	const canProceed = user?.credits.balance >= (selectedTemplate?.credits || 0);

	return (
		<div>
			<PageHeader
				title="Create New Project"
				subtitle="Transform property images into stunning videos"
				breadcrumbs={[
					{label: "Dashboard", href: "/dashboard"},
					{label: "Projects", href: "/dashboard/projects"},
					{label: "New Project"},
				]}
			/>

			{/* Progress Steps */}
			<Card className="mb-6">
				<Card.Body>
					<div className="flex items-center justify-between">
						{[
							{num: 1, label: "Property URL", icon: HiLink},
							{num: 2, label: "Select Images", icon: HiPhotograph},
							{num: 3, label: "Configure", icon: HiLightningBolt},
						].map((item, index) => {
							const Icon = item.icon;
							return (
								<div key={item.num} className="flex items-center flex-1">
									<div className="flex items-center gap-3">
										<div
											className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
												step >= item.num
													? "bg-primary-600 text-white"
													: "bg-gray-200 text-gray-600"
											}`}
										>
											{step > item.num ? "✓" : item.num}
										</div>
										<div className="hidden md:block">
											<p
												className={`text-sm font-medium ${
													step >= item.num ? "text-gray-900" : "text-gray-500"
												}`}
											>
												{item.label}
											</p>
										</div>
									</div>
									{index < 2 && (
										<div
											className={`flex-1 h-0.5 mx-4 transition-all ${
												step > item.num ? "bg-primary-600" : "bg-gray-200"
											}`}
										/>
									)}
								</div>
							);
						})}
					</div>
				</Card.Body>
			</Card>

			{/* Step 1: URL Input */}
			{step === 1 && (
				<motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}>
					<Card>
						<Card.Header>
							<h2 className="text-xl font-semibold text-gray-900">
								Enter Property URL
							</h2>
						</Card.Header>
						<Card.Body>
							<Alert
								type="info"
								title="Supported Platform"
								message="Currently, we support scraping images from realestate.com.au listings only."
								className="mb-6"
							/>

							<Input
								label="Property URL"
								placeholder="https://www.realestate.com.au/property/..."
								value={formData.url}
								onChange={handleChange}
								name="url"
								error={errors.url}
								helperText="Paste the full URL of the property listing"
								leftIcon={<HiLink className="w-5 h-5" />}
								disabled={loading}
							/>

							<div className="mt-6">
								<Button
									onClick={handleScrapeImages}
									loading={loading}
									disabled={!formData.url}
									size="lg"
								>
									{loading ? "Scraping Images..." : "Continue"}
									<HiArrowRight className="w-5 h-5" />
								</Button>
							</div>
						</Card.Body>
					</Card>
				</motion.div>
			)}

			{/* Step 2: Select Images */}
			{step === 2 && (
				<motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}>
					<Card>
						<Card.Header>
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold text-gray-900">
									Select Images ({selectedImages.length} selected)
								</h2>
								<div className="flex gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={() =>
											setSelectedImages(scrapedImages.map((img) => img.id))
										}
									>
										Select All
									</Button>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => setSelectedImages([])}
									>
										Deselect All
									</Button>
								</div>
							</div>
						</Card.Header>
						<Card.Body>
							{scrapedImages.length > 0 ? (
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
									{scrapedImages.map((image) => (
										<div
											key={image.id}
											onClick={() => toggleImageSelection(image.id)}
											className={`relative aspect-video rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
												selectedImages.includes(image.id)
													? "border-primary-600 ring-2 ring-primary-200"
													: "border-gray-200 hover:border-gray-300"
											}`}
										>
											<img
												src={image.url}
												alt={`Property ${image.id}`}
												className="w-full h-full object-cover"
											/>
											{selectedImages.includes(image.id) && (
												<div className="absolute inset-0 bg-primary-600/20 flex items-center justify-center">
													<div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
														<svg
															className="w-5 h-5 text-white"
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
												</div>
											)}
										</div>
									))}
								</div>
							) : (
								<EmptyState
									icon={<HiPhotograph className="w-8 h-8" />}
									title="No images found"
									description="We couldn't find any images from this URL"
								/>
							)}

							<div className="flex items-center justify-between">
								<Button variant="secondary" onClick={() => setStep(1)}>
									Back
								</Button>
								<Button
									onClick={() => setStep(3)}
									disabled={selectedImages.length === 0}
								>
									Continue
									<HiArrowRight className="w-5 h-5" />
								</Button>
							</div>
						</Card.Body>
					</Card>
				</motion.div>
			)}

			{/* Step 3: Configure */}
			{step === 3 && (
				<motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}}>
					<div className="grid lg:grid-cols-3 gap-6">
						{/* Configuration Form */}
						<div className="lg:col-span-2">
							<Card>
								<Card.Header>
									<h2 className="text-xl font-semibold text-gray-900">
										Configure Video
									</h2>
								</Card.Header>
								<Card.Body className="space-y-5">
									<Input
										label="Project Title"
										placeholder="e.g., Modern Villa Showcase"
										value={formData.title}
										onChange={handleChange}
										name="title"
										helperText="Give your project a memorable name"
									/>

									<div>
										<label className="label">Template</label>
										<div className="grid md:grid-cols-2 gap-3">
											{VIDEO_TEMPLATES.map((template) => (
												<div
													key={template.id}
													onClick={() =>
														setFormData((prev) => ({
															...prev,
															template: template.id,
														}))
													}
													className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
														formData.template === template.id
															? "border-primary-600 bg-primary-50"
															: "border-gray-200 hover:border-gray-300"
													}`}
												>
													<div className="flex items-start gap-3">
														<span className="text-3xl">{template.icon}</span>
														<div className="flex-1">
															<div className="flex items-center justify-between mb-1">
																<h4 className="font-semibold text-gray-900">
																	{template.name}
																</h4>
																<span className="text-sm font-medium text-primary-600">
																	{template.credits} credit
																	{template.credits > 1 ? "s" : ""}
																</span>
															</div>
															<p className="text-sm text-gray-600">
																{template.description}
															</p>
														</div>
													</div>
												</div>
											))}
										</div>
									</div>

									<div className="grid md:grid-cols-2 gap-4">
										<Select
											label="Aspect Ratio"
											value={formData.aspectRatio}
											onChange={handleChange}
											name="aspectRatio"
											options={ASPECT_RATIOS.map((ratio) => ({
												value: ratio.id,
												label: `${ratio.name} (${ratio.subtext})`,
											}))}
										/>

										<Select
											label="Quality"
											value={formData.quality}
											onChange={handleChange}
											name="quality"
											options={[
												{value: "720p", label: "720p HD"},
												{value: "1080p", label: "1080p Full HD"},
												{value: "4k", label: "4K Ultra HD (Premium)"},
											]}
										/>
									</div>

									<Textarea
										label="Description (Required)"
										placeholder="Add any additional notes or requirements..."
										value={formData.description}
										onChange={handleChange}
										name="description"
										rows={3}
										required={true}
									/>
								</Card.Body>
							</Card>
						</div>

						{/* Summary */}
						<div>
							<Card className="sticky top-6">
								<Card.Header>
									<h3 className="font-semibold text-gray-900">Summary</h3>
								</Card.Header>
								<Card.Body className="space-y-4">
									<div>
										<p className="text-sm text-gray-600 mb-1">
											Selected Images
										</p>
										<p className="text-2xl font-bold text-gray-900">
											{selectedImages.length}
										</p>
									</div>

									<div className="divider" />

									<div>
										<p className="text-sm text-gray-600 mb-1">Template</p>
										<p className="font-medium text-gray-900">
											{selectedTemplate?.name}
										</p>
									</div>

									<div>
										<p className="text-sm text-gray-600 mb-1">
											Credits Required
										</p>
										<p className="text-2xl font-bold text-primary-600">
											{selectedTemplate?.credits || 0}
										</p>
									</div>

									<div>
										<p className="text-sm text-gray-600 mb-1">Your Balance</p>
										<p className="font-medium text-gray-900">
											{user?.credits.balance || 0} credits
										</p>
									</div>

									{!canProceed && (
										<Alert
											type="warning"
											message="Insufficient credits. Please purchase more credits to continue."
										/>
									)}

									<div className="divider" />

									<div className="space-y-2">
										<Button
											onClick={handleCreateProject}
											loading={loading}
											disabled={!canProceed}
											className="w-full"
										>
											{loading ? "Creating..." : "Generate Video"}
										</Button>
										<Button
											variant="secondary"
											onClick={() => setStep(2)}
											className="w-full"
										>
											Back
										</Button>
									</div>
								</Card.Body>
							</Card>
						</div>
					</div>
				</motion.div>
			)}
		</div>
	);
};

export default CreateProjectPage;
