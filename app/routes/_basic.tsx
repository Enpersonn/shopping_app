import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, Form, useLoaderData } from "@remix-run/react";
import { getUser } from "../utils/supabase/auth_service";
import { requireAdmin } from "~/utils/auth/auth-server";
import { User2 } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	const isValidSession = !!user;
	const isAdmin = await requireAdmin(request, false);
	return { isValidSession, isAdmin };
}

export default function Basic() {
	const { isValidSession, isAdmin } = useLoaderData<typeof loader>();
	return (
		<>
			<div className="min-h-screen">
				<nav className="fixed top-0 left-0 w-full px-6 py-4 h-16 border-b bg-foreground text-background flex justify-between items-center  ">
					<Link to="/">
						<img src="/logo-white.svg" alt="AC Logo" className="size-10" />
					</Link>
					<nav className="flex gap-4">test</nav>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<User2 className="size-5" />
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{isValidSession && (
								<DropdownMenuItem asChild>
									<Link to="/profile">Profile</Link>
								</DropdownMenuItem>
							)}
							{isAdmin && (
								<DropdownMenuItem asChild>
									<Link to="/admin">Admin</Link>
								</DropdownMenuItem>
							)}
							{isValidSession ? (
								<DropdownMenuItem asChild>
									<Form method="post" action="/signout">
										<button type="submit">Sign Out</button>
									</Form>
								</DropdownMenuItem>
							) : (
								<DropdownMenuItem asChild>
									<Link to="/login" className="hover:underline">
										Login
									</Link>
								</DropdownMenuItem>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</nav>
				<div className="grid mx-auto w-full max-w-7xl grid-cols-12">
					<div className="col-span-8 col-start-2 h-full">
						<Outlet />
					</div>
				</div>
			</div>
			<div className="h-[240px] bg-black border-t border-gray-700">
				<p>test</p>
			</div>
		</>
	);
}
