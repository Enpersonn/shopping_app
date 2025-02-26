import { Outlet } from "@remix-run/react";
import { requireAdmin, requireUserSession } from "../utils/auth/auth-server";
import type { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
	await requireUserSession(request);
	await requireAdmin(request);
	return null;
}

export default function Admin() {
	return (
		<div>
			<nav className="flex flex-col w-full justify-center items-center border-b border-gray-700 gap-5 px-12 py-8">
				<h1>AdminPanel</h1>
			</nav>
			<Outlet />
		</div>
	);
}
