// client/src/components/ui/PageHeader.jsx
import {cn} from "@utils/cn";

const PageHeader = ({title, subtitle, actions, breadcrumbs, className}) => {
	return (
		<div className={cn("mb-6", className)}>
			{breadcrumbs && (
				<div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
					{breadcrumbs.map((crumb, index) => (
						<div key={index} className="flex items-center gap-2">
							{index > 0 && <span>/</span>}
							{crumb.href ? (
								<a
									href={crumb.href}
									className="hover:text-gray-900 transition-colors"
								>
									{crumb.label}
								</a>
							) : (
								<span className="text-gray-900">{crumb.label}</span>
							)}
						</div>
					))}
				</div>
			)}

			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">{title}</h1>
					{subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
				</div>

				{actions && <div className="flex items-center gap-3">{actions}</div>}
			</div>
		</div>
	);
};

export default PageHeader;
