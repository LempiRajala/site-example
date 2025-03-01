import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<>
			<main className="min-h-dvh grid grid-cols-[auto_1fr] max-h-dvh">
				<DashboardSidebar/>
				{children}
			</main>
			<Toaster
				toastOptions={{ className: 'toast' }}
			/>
		</>
	)
}