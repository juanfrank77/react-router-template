import { Link } from "react-router";
import { Route } from "./+types/404";

export function loader({ context }: Route.LoaderArgs) {
    const { clientEnv } = context
    console.info(clientEnv)
    return {
        clientEnv
    }
}

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center gap-4 dark:bg-gray-900">
            <h1 className="text-3xl font-bold text-black dark:text-white">404 Not Found</h1>
            <p className="text-xl text-gray-900 dark:text-gray-300">Sorry, the page you are looking for does not exist.</p>
            <Link to="/" className="underline text-black dark:text-white">Go back home</Link>
        </div>
    )
}