import { redirect } from "@remix-run/node";
import { getSession } from "../../sessions";
import type { Permissions } from "../../types/auth.types";

export async function requirePermission(
	request: Request,
	permission: Permissions,
) {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");
	console.log(user);
	if (!user || !user.permissions || user.permissions.length === 0) {
		throw redirect("/login");
	}

	const hasPermission = user.permissions?.includes(permission);

	if (!hasPermission) {
		throw redirect("/unauthorized");
	}

	return user;
}

export async function requireAnyPermission(
	request: Request,
	permissions: Permissions[],
) {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");
	if (!user || !user.permissions || user.permissions.length === 0) {
		throw redirect("/login");
	}

	const hasPermission = permissions.some((permission) =>
		user.permissions?.includes(permission),
	);

	if (!hasPermission) {
		throw redirect("/unauthorized");
	}

	return user;
}
