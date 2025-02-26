import { Link, Form, useLocation } from "@remix-run/react";
import Button from "../../components/button";
import type { User } from "~/types/auth.types";
import { cn } from "../../utils/classes";
import Input from "../../components/input";

export default function AuthView({
	user,
}: {
	user?: User | null;
}) {
	const location = useLocation();
	const isLogin = location.pathname === "/login";
	const isValidSession = !!user;
	return (
		<div className="h-screen w-screen ">
			<div className="grid mx-auto w-full max-w-7xl grid-cols-12">
				<div className="col-span-6 col-start-4 h-full">
					<div className="border border-gray-300 shadow-sm mt-[10vh] rounded-md p-4 flex flex-col gap-12">
						<div className="flex w-full justify-between ">
							<Link
								to="/"
								className=" border-[1px] hover:bg-slate-50 no-underline px-6 py-2 rounded-md"
							>
								Home
							</Link>

							{isValidSession ? (
								<Form method="post" action="/signout">
									<Button type="submit">Sign Out</Button>
								</Form>
							) : (
								<Link
									to={!isLogin ? "/login" : "/register"}
									className=" border-[1px] hover:bg-slate-50 no-underline px-6 py-2 rounded-md"
								>
									{isLogin ? "Register" : "Login"}
								</Link>
							)}
						</div>
						<Form method="post" action={location.pathname}>
							<div className="grid grid-rows-4 gap-x-5 w-full gap-y-8">
								<div className="flex h-[70px]">
									<div
										className={cn(
											"w-full transition-all duration-300 overflow-hidden ",
											isLogin
												? "max-w-0 opacity-0"
												: "max-w-52 opacity-100 mr-5",
										)}
									>
										<Input
											label="Name"
											type="text"
											name="name"
											className="w-full"
											id="name"
											defaultValue={isValidSession ? user?.name : ""}
										/>
									</div>
									<div className="flex-1">
										<Input
											label="Email"
											type="text"
											name="email"
											className="w-full"
											id="email"
											defaultValue={isValidSession ? user?.email : ""}
										/>
									</div>
								</div>
								{!isValidSession && (
									<div className="flex justify-end h-[70px]">
										<div className="flex-1">
											<Input
												label="Password"
												type="password"
												name="password"
												id="password"
											/>
										</div>

										<div
											className={cn(
												"flex flex-col  transition-all duration-300 overflow-hidden",
												isLogin
													? "max-w-0 opacity-0"
													: "max-w-96 opacity-100 ml-5",
											)}
										>
											<Input
												label="Confirm Password"
												type="password"
												name="confirmPassword"
												id="confirmPassword"
											/>
										</div>
									</div>
								)}
							</div>
							<Button type="submit" className="w-full">
								{isValidSession ? "Update" : isLogin ? "Login" : "Register"}
							</Button>
						</Form>
					</div>
				</div>
			</div>
		</div>
	);
}
