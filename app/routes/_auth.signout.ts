import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { commitSession, getSession } from "../sessions";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

export async function action({ request }: ActionFunctionArgs) {
	const supabaseUrl = process.env.SUPABASE_URL ?? "";
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "");
			},
		},
	});

	await supabase.auth.signOut();

	const session = await getSession(request.headers.get("Cookie"));
	session.unset("user");

	return redirect("/", {
		headers: { "Set-Cookie": await commitSession(session) },
	});
}
