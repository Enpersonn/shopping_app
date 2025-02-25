import { createCookieSessionStorage } from "@remix-run/node";
import type { SessionData, SessionFlashData } from "./types/auth.types";

const { getSession, commitSession, destroySession } =
	createCookieSessionStorage<SessionData, SessionFlashData>({
		cookie: {
			name: "__session",
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			secrets: [process.env.SESSION_SECRET ?? "s3cr3t"],
			maxAge: 60 * 60 * 24 * 7,
		},
	});

export { getSession, commitSession, destroySession };
