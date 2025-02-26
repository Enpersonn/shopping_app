import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getSession } from "../sessions";
import AuthView from "../views/auth/auth-view";
import { Frown } from "lucide-react";
export async function loader({ request }: LoaderFunctionArgs) {
	const session = await getSession(request.headers.get("Cookie"));
	const user = session.get("user");
	return { user };
}

export default function Auth() {
	const { user } = useLoaderData<typeof loader>();

	return <AuthView user={user} />;
}

export function ErrorBoundary() {
	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center  md:justify-center text-7xl text-center  md:text-[200px] opacity-20 p-20">
				<h1 className="font-bold">OH NO!</h1>
				<Frown className=" size-80" />
				<p className="text-3xl">Something went wrong</p>
			</div>
			<div className="relative z-10 flex items-center justify-center gap-8 text-xl">
				<Link
					to="/"
					className=" border-[1px] bg-white hover:bg-slate-50 px-6 py-2 rounded-md"
				>
					Home
				</Link>
				<Link
					to="/"
					className=" border-[1px] bg-white hover:bg-slate-50 px-6 py-2 rounded-md"
				>
					Login
				</Link>
			</div>
		</div>
	);
}
