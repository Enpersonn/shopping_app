import { Link } from "@remix-run/react";

export default function Unauthorized() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="absolute top-0 left-0 w-full h-full flex flex-col items-center  md:justify-center text-7xl text-center  md:text-[200px] opacity-20 p-20">
				<h1 className="font-bold">401</h1>
				<p>Unauthorized Access</p>
			</div>

			<div className="relative z-10 flex items-center justify-center gap-8 text-xl">
				<Link
					to="/"
					className=" hover:font-semibold transition-all bg-white/50 px-4 py-2 rounded-md duration-150"
				>
					Home
				</Link>
				<Link
					to="/"
					className=" hover:font-semibold transition-all bg-white/50 px-4 py-2 rounded-md duration-150"
				>
					Login
				</Link>
			</div>
		</div>
	);
}
