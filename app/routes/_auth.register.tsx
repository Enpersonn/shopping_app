import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, redirect } from "@remix-run/react";
import { commitSession } from "../sessions";
import { signup } from "../utils/supabase/auth_service";

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
