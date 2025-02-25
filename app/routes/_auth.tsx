import type { LoaderFunctionArgs } from "@remix-run/node";
import {
	Link,
	Outlet,
	useLocation,
	useLoaderData,
	Form,
} from "@remix-run/react";
import { getSession } from "../sessions";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));

	return { isValidSession: !!session.get("user") };
}

export default function Auth() {
	const { isValidSession } = useLoaderData<typeof loader>();
	const location = useLocation();
	const isLogin = location.pathname === "/login";

	return (
		<div className="h-screen w-screen ">
			<div className="grid mx-auto w-full max-w-7xl grid-cols-12">
				<div className="col-span-6 col-start-4 h-full">
					<div className=" pt-[10vh]" />
					<div className="border-2 border-gray-300 bg-black rounded-md p-4 flex flex-col gap-4">
						<div className="flex w-full justify-between underline">
							<Link to="/" className=" hover:font-bold transition-all">
								Home
							</Link>

							<div>
								{isValidSession ? (
									<Form
										method="post"
										action="/signout"
										className=" hover:font-bold transition-all"
									>
										<button type="submit">Sign Out</button>
									</Form>
								) : (
									<Link
										to={!isLogin ? "/login" : "/register"}
										className=" hover:font-bold transition-all"
									>
										{isLogin ? "Register" : "Login"}
									</Link>
								)}
							</div>
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
