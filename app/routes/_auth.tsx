import { Link, Outlet, useLocation } from "@remix-run/react";

export default function Auth() {
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
								<Link
									to={!isLogin ? "/login" : "/register"}
									className=" hover:font-bold transition-all"
								>
									{isLogin ? "Register" : "Login"}
								</Link>
							</div>
						</div>
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
}
