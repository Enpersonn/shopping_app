import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { commitSession, getSession } from "../sessions";

export default function Register() {
	return (
		<Form
			method="post"
			className="flex flex-col h-full justify-between gap-5 px-12 py-8"
		>
			<div className="grid grid-rows-4 gap-2">
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						className="border-2 border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						className="border-2 border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						className="border-2 border-gray-300 rounded-md p-2"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="confirmPassword">Confirm Password</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirmPassword"
						className="border-2 border-gray-300 rounded-md p-2"
					/>
				</div>
			</div>
			<button
				type="submit"
				className=" border-[1px] border-gray-300 text-white p-2 rounded-md"
			>
				Register
			</button>
		</Form>
	);
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData();
	const name = formData.get("name");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");

	if (password !== confirmPassword) {
		return new Response(JSON.stringify({ error: "Passwords do not match" }), {
			status: 400,
		});
	}

	const supabaseUrl = process.env.SUPABASE_URL ?? "";
	const supabaseAnonKey = process.env.SUPABASE_ANON_KEY ?? "";

	const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
		cookies: {
			getAll() {
				return parseCookieHeader(request.headers.get("Cookie") ?? "");
			},
		},
	});

	const { data, error } = await supabase.auth.signUp({
		email: email as string,
		password: password as string,
		options: {
			data: { name: name as string },
		},
	});

	if (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
		});
	}

	const session = await getSession(request.headers.get("Cookie"));

	session.set("user", {
		id: data.user?.id ?? "",
		email: data.user?.email ?? "",
		name: data.user?.user_metadata.full_name ?? "",
	});

	return redirect("/", {
		headers: {
			"Set-Cookie": await commitSession(session),
		},
	});
}
