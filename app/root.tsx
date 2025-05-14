import {
  type LinksFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { ClientHintCheck, getHints } from './lib/client-hints'
import { ThemeSelector } from './lib/theme-selector'
import styles from '~/tailwind.css?url'
import { Route } from './+types/root'

export async function loader({
  context,
  request,
}: Route.LoaderArgs) {
  const { clientEnv } = context
  const hints = getHints(request)
  return { clientEnv, hints }
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>{children}</>
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { clientEnv, hints } = loaderData
  const theme = hints.theme

  return (
    <html className="overflow-y-auto overflow-x-hidden" data-env={clientEnv.NODE_ENV} data-theme={theme}>
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full">
        <ThemeSelector />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const message = "Oops!";
  const details = "Sorry, an unexpected error has occurred.";
  let stack: string | undefined;

  if (import.meta.env.DEV && error instanceof Error) stack = error.stack;

  return (
    <main className="mx-auto pt-16 p-4 text-center">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <pre className='w-full p-4'><code>{stack}</code></pre>}
    </main>
  )
}
