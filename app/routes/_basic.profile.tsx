import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "../utils/supabase/auth_service";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	return { user };
}

export default function Profile() {
	const { user } = useLoaderData<typeof loader>();

	return (
		<div className="flex flex-col h-full justify-between gap-5 px-12 pt-24">
			<p>Welcome {user?.name}</p>
			<pre>{JSON.stringify(user, null, 2)}</pre>
			<Link to="/edit" className="hover:underline">
				Edit
			</Link>
		</div>
	);
}
