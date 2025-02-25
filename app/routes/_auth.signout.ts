import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { commitSession } from "../sessions";
import { signOut } from "../utils/supabase/auth_service";

export async function action({ request }: ActionFunctionArgs) {
	const session = await signOut(request);

	return redirect("/", {
		headers: { "Set-Cookie": await commitSession(session) },
	});
}
