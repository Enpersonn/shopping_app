import { getSession } from "../../sessions";
import { Permissions } from "../../types/auth.types";

export async function requireUserSession(request: Request) {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.has("user");
	if (!user) {
		throw new Response(null, { status: 302, headers: { Location: "/login" } });
	}
}

export async function requirePermission(
	request: Request,
	permission: Permissions,
	redirect = true,
	redirectTo = "/unauthorized",
) {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");

	const hasPermission = user?.permissions?.includes(permission);

	if (!hasPermission && redirect) {
		throw new Response(null, {
			status: 302,
			headers: { Location: redirectTo },
		});
	}

	return true;
}

export async function requireAnyPermission(
	request: Request,
	permissions: Permissions[],
	redirect = true,
	redirectTo = "/unauthorized",
) {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");
	const hasPermission = permissions.some((permission) =>
		user?.permissions?.includes(permission),
	);

	if (!hasPermission) {
		if (redirect) {
			throw new Response(null, {
				status: 302,
				headers: { Location: redirectTo },
			});
		}
		return false;
	}

	return true;
}

export async function requireAdmin(
	request: Request,
	redirect = true,
	redirectTo = "/unauthorized",
) {
	return requireAnyPermission(
		request,
		[
			Permissions.EDIT_WEBSITE_CONTENT,
			Permissions.MANAGE_ORDERS,
			Permissions.MANAGE_PRODUCTS,
			Permissions.VIEW_REPORTS,
			Permissions.MANAGE_USERS,
		],
		redirect,
		redirectTo,
	);
}
