import { Outlet } from "@remix-run/react";
import { requireAnyPermission } from "../utils/auth/auth-server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Permissions } from "~/types/auth.types";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireAnyPermission(request, [
		Permissions.EDIT_WEBSITE_CONTENT,
		Permissions.MANAGE_ORDERS,
		Permissions.MANAGE_PRODUCTS,
		Permissions.VIEW_REPORTS,
		Permissions.MANAGE_USERS,
	]);
	return { user };
}

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
