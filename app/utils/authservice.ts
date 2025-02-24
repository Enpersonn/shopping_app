import { getSession } from "../sessions";
import { createSupabaseClient } from "./supabase.server";

type AuthData = {
	id?: string;
	email?: string;
	user_metadata?: {
		name?: string;
	};
};

export async function getUser(request: Request) {
	const session = await getSession(request.headers.get("Cookie"));
	return session.get("user");
}

export async function handleAuthResponse(
	request: Request,
	data: AuthData | null,
	error: Error | null,
) {
	if (error) {
		throw new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}

	if (!data) {
		throw new Response(JSON.stringify({ error: "No data" }), {
			status: 400,
		});
	}

	const session = await getSession(request.headers.get("Cookie"));
	session.set("user", {
		id: data.id ?? "",
		email: data.email ?? "",
		name: data.user_metadata?.name ?? "",
	});

	return session;
}

export async function login(request: Request, email: string, password: string) {
	const supabase = createSupabaseClient(request);

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	return handleAuthResponse(request, data as AuthData, error);
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

	const supabase = createSupabaseClient(request);

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: { name },
		},
	});

	return handleAuthResponse(request, data as AuthData, error);
}

export async function updateUser(
	request: Request,
	email: string,
	name: string,
) {
	const supabase = createSupabaseClient(request);
	const { data, error } = await supabase.auth.updateUser({
		email,
		data: { name },
	});

	return handleAuthResponse(request, data as AuthData, error);
}

export async function signOut(request: Request) {
	const supabase = createSupabaseClient(request);
	await supabase.auth.signOut();

	const session = await getSession(request.headers.get("Cookie"));
	session.unset("user");
	return session;
}
