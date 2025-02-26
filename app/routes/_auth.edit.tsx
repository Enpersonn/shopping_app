import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { commitSession } from "../sessions";
import { updateUser, getUser } from "../utils/supabase/auth_service";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	return user;
}

export default function Edit() {
	const user = useLoaderData<typeof loader>();
	return (
		<Form
			method="post"
			className="flex flex-col h-full justify-between gap-5 px-6 py-8"
		>
			<div className="grid grid-cols-2 grid-rows-4 gap-2">
				<div className="flex flex-col gap-2">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						className="border-b-2   p-2"
						defaultValue={user?.name}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label htmlFor="email">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						className="border-b-2   p-2"
						defaultValue={user?.email}
					/>
				</div>
			</div>
			<button
				type="submit"
				className=" border-[1px] hover:bg-slate-50  p-2 rounded-md"
			>
				Update
			</button>
		</Form>
	);
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
