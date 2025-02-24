import { Link, Outlet } from "@remix-run/react";

export default function Basic() {
	return (
		<>
			<div className="min-h-screen">
				<nav className="fixed top-0 left-0 w-full px-6 py-4 h-16 bg-black/25 flex justify-between items-center backdrop-blur-sm border-b border-gray-700">
					<p>test</p>
					<p>test</p>
					<div>
						<Link to="/login" className="hover:underline">
							Login
						</Link>
					</div>
				</nav>
				<Outlet />
			</div>
			<div className="h-[240px] bg-black border-t border-gray-700">
				<p>test</p>
			</div>
		</>
	);
}
