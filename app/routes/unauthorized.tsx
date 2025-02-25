import { Link } from "@remix-run/react";

export default function Unauthorized() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="text-2xl font-bold flex items-end gap-2">
				<span className="text-red-500 text-4xl">401</span> Unauthorized Access
			</div>
			<p className="mt-2 text-red-500">
				You don&apos;t have permission to access this page.
			</p>
			<div>
				<Link to="/">go home</Link>
			</div>
		</div>
	);
}
