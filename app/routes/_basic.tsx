import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, Form, useLoaderData } from "@remix-run/react";
import { getUser } from "../utils/supabase/auth_service";
import { requireAdmin } from "~/utils/auth/auth-server";
import { User2, DoorOpen, UserRoundCog, User } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";

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
				<div className="fixed dark bg-background top-0 left-0 w-full px-6 py-4 h-16 border-b text-foreground flex justify-between items-center  ">
					<Link to="/">
						<img src="/logo-white.svg" alt="AC Logo" className="size-10" />
					</Link>
					<nav className="flex gap-4">test</nav>
					{isValidSession ? (

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<User2 className="size-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							{isValidSession && (
								<DropdownMenuItem asChild>
									<Link
										to="/profile"
										className="flex gap-2 justify-between items-center"
									>
										Profile
										<User className="size-4" />
									</Link>
								</DropdownMenuItem>
							)}
							{isAdmin && (
								<DropdownMenuItem asChild>
									<Link
										to="/admin"
										className="flex gap-2 justify-between items-center"
									>
										Admin
										<UserRoundCog className="size-4" />
									</Link>
								</DropdownMenuItem>
							)}
								<>
									<DropdownMenuSeparator />
									<DropdownMenuItem asChild>
										<Form method="post" action="/signout">
											<button
												type="submit"
												className="flex  gap-2 w-full justify-between items-center"
											>
												Sign Out
												<DoorOpen className="size-4" />
											</button>
										</Form>
									</DropdownMenuItem>
								</>
						</DropdownMenuContent>
					</DropdownMenu>
							) : (
								<Button variant="outline" size="lg" asChild>
										<Link to="/login" className="hover:underline">
											Login
										</Link>
								</Button>
							)}
				</div>
				<div className="grid mx-auto w-full max-w-7xl grid-cols-12">
					<div className="col-span-8 col-start-3 h-full">
						<Outlet />
					</div>
				</div>
			</div>
			<div className="h-[240px] dark bg-background text-foreground border-t ">
				<p>test</p>
			</div>
		</>
	);
}
