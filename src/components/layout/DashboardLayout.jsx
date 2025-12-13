// client/src/components/layout/DashboardLayout.jsx
import {Outlet} from "react-router-dom";
import {useState} from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import {useUIStore} from "@store/uiStore";

const DashboardLayout = () => {
	const {sidebarOpen} = useUIStore();

	return (
		<div className="min-h-screen bg-gray-50 flex">
			{/* Sidebar */}
			<DashboardSidebar />

			{/* Main Content */}
			<div
				className={`flex-1 flex flex-col transition-all duration-300 ${
					sidebarOpen ? "lg:ml-64" : "lg:ml-20"
				}`}
			>
				{/* Header */}
				<DashboardHeader />

				{/* Page Content */}
				<main className="flex-1 p-6">
					<div className="max-w-7xl mx-auto">
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	);
};

export default DashboardLayout;
