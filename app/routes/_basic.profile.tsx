import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "../utils/authservice";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	return user ?? null;
}

export default function Profile() {
	const user = useLoaderData<typeof loader>();

	return (
		<div className="flex flex-col h-full justify-between gap-5 px-12 pt-24">
			<p>Welcome {user?.name}</p>
			<Link to="/edit" className="hover:underline">
				Edit
			</Link>
		</div>
	);
}
