// client/src/components/layout/Footer.jsx
import {Link} from "react-router-dom";
import {
	HiOutlineMailOpen,
	HiOutlineLocationMarker,
	HiOutlinePhone,
} from "react-icons/hi";
import {FaTwitter, FaLinkedin, FaGithub, FaYoutube} from "react-icons/fa";

const Footer = () => {
	const footerLinks = {
		Product: [
			{name: "Features", href: "/features"},
			{name: "Pricing", href: "/pricing"},
			{name: "Templates", href: "#"},
			{name: "API", href: "#"},
		],
		Company: [
			{name: "About", href: "#"},
			{name: "Blog", href: "#"},
			{name: "Careers", href: "#"},
			{name: "Contact", href: "#"},
		],
		Resources: [
			{name: "Documentation", href: "#"},
			{name: "Help Center", href: "#"},
			{name: "Community", href: "#"},
			{name: "Status", href: "#"},
		],
		Legal: [
			{name: "Privacy Policy", href: "#"},
			{name: "Terms of Service", href: "#"},
			{name: "Cookie Policy", href: "#"},
			{name: "GDPR", href: "#"},
		],
	};

	const socialLinks = [
		{icon: FaTwitter, href: "#", label: "Twitter"},
		{icon: FaLinkedin, href: "#", label: "LinkedIn"},
		{icon: FaGithub, href: "#", label: "GitHub"},
		{icon: FaYoutube, href: "#", label: "YouTube"},
	];

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			<div className="container-custom py-12">
				<div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
					{/* Brand */}
					<div className="col-span-2">
						<Link to="/" className="flex items-center gap-2 mb-4">
							<div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg flex items-center justify-center">
								<span className="text-white font-bold text-lg">V</span>
							</div>
							<span className="text-xl font-bold text-gray-900">
								VideoGen AI
							</span>
						</Link>
						<p className="text-sm text-gray-600 mb-4 max-w-xs">
							Transform your real estate images into stunning cinematic videos
							with the power of AI.
						</p>
						<div className="flex items-center gap-3">
							{socialLinks.map((social) => (
								<a
									key={social.label}
									href={social.href}
									aria-label={social.label}
									className="w-9 h-9 rounded-lg bg-gray-200 hover:bg-primary-600 text-gray-600 hover:text-white flex items-center justify-center transition-colors"
								>
									<social.icon className="w-4 h-4" />
								</a>
							))}
						</div>
					</div>

					{/* Links */}
					{Object.entries(footerLinks).map(([category, links]) => (
						<div key={category}>
							<h3 className="font-semibold text-gray-900 mb-3 text-sm">
								{category}
							</h3>
							<ul className="space-y-2">
								{links.map((link) => (
									<li key={link.name}>
										<Link
											to={link.href}
											className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom */}
				<div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
					<p className="text-sm text-gray-500">
						© 2024 VideoGen AI. All rights reserved.
					</p>
					<p className="text-sm text-gray-500">
						Built with ❤️ by <span className="font-medium">DevRolin</span>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
