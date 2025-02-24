import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
	user: {
		name: string;
		id: string;
		email: string;
	};
};

type SessionFlashData = {
	error: string;
};

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__session",
			path: "/",
			httpOnly: true,
			sameSite: "lax",
			secrets: ["s3cr3t"],
		},
	});

export { getSession, commitSession, destroySession };
