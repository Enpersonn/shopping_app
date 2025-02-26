import type { SessionData } from "~/types/auth.types";
import { getSession } from "../../sessions";
import { createSupabaseClient } from "./supabase.server";

export async function getUser(request: Request) {
	const session = await getSession(request.headers.get("Cookie"));
	if (!session.has("user")) {
		return null;
	}
	return session.get("user");
}

export async function handleAuthResponse(
	request: Request,
	data: SessionData | null,
	error: Error | null,
) {
	if (error) {
		console.error("Authentication error:", error);
		throw new Response(
			JSON.stringify({ error: "An error occurred during authentication" }),
			{ status: 401 },
		);
	}
	if (!data) {
		throw new Response(JSON.stringify({ error: "No data" }), {
			status: 404,
		});
	}
	const session = await getSession(request.headers.get("Cookie"));
	session.set("user", {
		id: data.user?.id,
		email: data.user?.email,
		name: data.user?.name,
		lastLogin: new Date().toISOString(),
		permissions: data.user?.permissions,
	});
	return session;
}

export async function login(request: Request, email: string, password: string) {
	const { supabase } = createSupabaseClient(request);

	const { data: authData, error: authError } =
		await supabase.auth.signInWithPassword({
			email,
			password,
		});

	const { data: roleData, error: roleError } = await supabase
		.from("user_roles")
		.select("roles ( permissions )")
		.eq("user_id", authData.user?.id);
	// @ts-expect-error - permissions is an array of permissions
	const permissions = roleData?.flatMap((role) => role.roles.permissions) || [];
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const data = {
		user: {
			id: authData.user?.id,
			email: authData.user?.email,
			name: authData.user?.user_metadata?.name,
			permissions: permissions,
			additionalInfo: user,
		},
	};

	const error = authError || roleError;

	return handleAuthResponse(request, data, error);
}

export async function signup(
	request: Request,
	name: string,
	email: string,
	password: string,
	confirmPassword: string,
) {
	if (password !== confirmPassword) {
		throw new Response(JSON.stringify({ error: "Passwords do not match" }), {
			status: 400,
		});
	}

	const { supabase } = createSupabaseClient(request);

	const { data: authData, error: authError } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { name },
		},
	});

	await supabase.from("user_roles").insert({
		user_id: authData.user?.id,
		role_name: "customer",
	});

	const { data: roleData, error: roleError } = await supabase
		.from("roles")
		.select("permissions")
		.eq("name", "customer");
	console.log(roleData);
	const permissions = roleData?.flatMap((role) => role.permissions);

	const data = {
		user: {
			id: authData.user?.id,
			email: authData.user?.email,
			name: authData.user?.user_metadata?.name,
			permissions: permissions,
		},
	} as SessionData;

	const error = authError || roleError;
	return handleAuthResponse(request, data, error);
}

export async function updateUser(
	request: Request,
	email: string,
	name: string,
) {
	const { supabase } = createSupabaseClient(request);
	const { data, error } = await supabase.auth.updateUser({
		email,
		data: { name },
	});

	return handleAuthResponse(request, data, error);
}

export async function signOut(request: Request) {
	const { supabase } = createSupabaseClient(request);
	await supabase.auth.signOut();

	const session = await getSession(request.headers.get("Cookie"));
	session.unset("user");
	return session;
}
