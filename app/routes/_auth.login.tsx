import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { commitSession } from "../sessions";
import { login } from "../utils/supabase/auth_service";

export default function Login() {
	return null;
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");

	const session = await login(request, email as string, password as string);

	return redirect("/", {
		headers: { "Set-Cookie": await commitSession(session) },
	});
}
