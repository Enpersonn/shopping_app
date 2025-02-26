import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/react";
import { commitSession } from "../sessions";
import { getUser, updateUser } from "../utils/supabase/auth_service";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	return user;
}

export default function Edit() {
	return null;
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");

	const session = await updateUser(request, email as string, name as string);

	return redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
