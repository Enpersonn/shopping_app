import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import { ArrowRight, DoorOpen, User, User2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { requireAdmin, requireUserSession } from "~/utils/auth/auth-server";
import { getUser } from "~/utils/supabase/auth_service";
export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	await requireUserSession(request);
	await requireAdmin(request);
	return { user };
}

export default function Admin() {
	const { user } = useLoaderData<typeof loader>();
	return (
		<div>
			<div className="fixed dark bg-background top-0 left-0 w-full px-6 py-4 h-16 border-b text-foreground flex justify-between items-center  ">
				<Link to="/">
					<img src="/logo-white.svg" alt="AC Logo" className="size-10" />
				</Link>
				<nav className="flex gap-4">
					Admin
					{user?.permissions?.map((permission) => (
						<p key={permission}>{permission}</p>
					))}
				</nav>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<User2 className="size-5" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem asChild>
							<Link
								to="/profile"
								className="flex gap-2 justify-between items-center"
							>
								Profile
								<User className="size-4" />
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link to="/" className="flex gap-2 justify-between items-center">
								Main
								<ArrowRight className="size-4" />
							</Link>
						</DropdownMenuItem>
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
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Outlet />
		</div>
	);
}
