import { createThemeSessionResolver } from "remix-themes";
import { createCookieSessionStorage } from "react-router";

const sessionSecret = process.env.SESSION_SECRET || "S3creT";
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set!");
}

const session = createCookieSessionStorage({
    cookie: {
        name: "__remix-themes",
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: process.env.NODE_ENV === "production",
    },
})

export const themeSessionResolver = createThemeSessionResolver(session);

function getUserSession(request: Request) {
    return session.getSession(request.headers.get("Cookie"));
}

export async function getUserInfo(request: Request) {
    const session = await getUserSession(request);
    const scheme = session.get("scheme") ?? "";
    const theme = session.get("theme");

    return {
        scheme,
        theme
    };
}