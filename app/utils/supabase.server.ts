import {
	createServerClient,
	parseCookieHeader,
	serializeCookieHeader,
} from "@supabase/ssr";

const createSupabaseServerClient = async (request: Request) => {
	const headers = new Headers();

	const supabaseUrl = process.env.SUPABASE_URL ?? "";
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "");
			},
			setAll(cookiesToSet) {
				for (const { name, value, options } of cookiesToSet) {
					headers.append(
						"Set-Cookie",
						serializeCookieHeader(name, value, options),
					);
				}
			},
		},
	});

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return new Response(JSON.stringify({ session }), {
		headers,
		status: 200,
		statusText: "OK",
	});
};

export { createSupabaseServerClient };
