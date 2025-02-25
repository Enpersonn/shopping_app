import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

export const createSupabaseClient = (request: Request) => {
	const cookies = request.headers.get("Cookie") ?? "";

	const supabaseUrl = process.env.SUPABASE_URL ?? "";
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return parseCookieHeader(cookies);
			},
			setAll(cookiesToSet) {
				for (const { name, value, options } of cookiesToSet) {
					request.headers.append(
						"Set-Cookie",
						serializeCookieHeader(name, value, options),
					);
				}
			},
		},
	});

	return { supabase, headers: request.headers };
};
