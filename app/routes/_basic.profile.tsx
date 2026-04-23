import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "../utils/supabase/auth_service";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await getUser(request);
	return { user };
}

export default function Profile() {
	const { user } = useLoaderData<typeof loader>();
	return (
		<div className="flex flex-col h-full justify-between gap-5 px-12 pt-24">
			<Card className=" p-4">
				<div className="flex justify-between items-start">
					<div className="flex flex-col gap-2">
						<h1 className="text-4xl font-medium ">{user?.name}</h1>
						<p className="text-sm text-muted-foreground">{user?.email}</p>
					</div>
					<Button asChild variant="outline">
						<Link to="/edit">Edit</Link>
					</Button>
				</div>
			</Card>
		</div>
	);
}
