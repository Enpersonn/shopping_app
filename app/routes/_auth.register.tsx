import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { commitSession } from "../sessions";
import { signup } from "../utils/supabase/auth_service";

export default function Register() {
	return null;
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");

	const session = await signup(
		request,
		name as string,
		email as string,
		password as string,
		confirmPassword as string,
	);

	return redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
