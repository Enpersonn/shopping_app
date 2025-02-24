import { Outlet } from "@remix-run/react";

export default function Admin() {
	return (
		<div>
			<nav className="flex flex-col gap-5 px-12 py-8">
				<h1>Admin</h1>
			</nav>
			<Outlet />
		</div>
	);
}
