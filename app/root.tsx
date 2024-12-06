import { type LinksFunction, Links, Meta, Outlet, Scripts } from "react-router";
import styles from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
