import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, Form, useLoaderData } from "@remix-run/react";
import { getUser } from "../utils/supabase/auth_service";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	const isValidSession = !!user;
	return { isValidSession };
}

export default function Basic() {
	const { isValidSession } = useLoaderData<typeof loader>();

	return (
		<>
			<div className="min-h-screen">
				<nav className="fixed top-0 left-0 w-full px-6 py-4 h-16 bg-black/25 flex justify-between items-center backdrop-blur-sm border-b border-gray-700">
					<div>
						{isValidSession && (
							<Link to="/profile" className="hover:underline">
								Profile
							</Link>
						)}
					</div>
					<nav>
						<p>test</p>
					</nav>
					<div>
						{isValidSession ? (
							<Form method="post" action="/signout" className="hover:underline">
								<button type="submit">Sign Out</button>
							</Form>
						) : (
							<>
								<Link to="/login" className="hover:underline">
									Login
								</Link>
							</>
						)}
					</div>
				</nav>
				<Outlet />
			</div>
			<div className="h-[240px] bg-black border-t border-gray-700">
				<p>test</p>
			</div>
		</>
	);
}
