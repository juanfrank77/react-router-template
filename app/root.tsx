import {
  type LinksFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'
import { ClientHintCheck, getHints } from './lib/client-hints'
import { LanguageSwitcher } from './lib/language-switcher'
import styles from '~/tailwind.css?url'
import { Route } from './+types/root'

export async function loader({
  context,
  request,
}: Route.LoaderArgs) {
  const { lang, clientEnv } = context
  const hints = getHints(request)
  return { lang, clientEnv, hints }
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const handle = {
  i18n: 'common',
}

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
  const { lang, clientEnv } = loaderData
  const { i18n } = useTranslation()

  useChangeLanguage(lang || 'en')

  return (
    <html className="overflow-y-auto overflow-x-hidden" lang={lang || 'en'} dir={i18n.dir()} data-env={clientEnv}>
      <head>
        <ClientHintCheck />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full">
        <LanguageSwitcher />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Sorry, an unexpected error has occurred.";
  let stack: string | undefined;

  const { t } = useTranslation()

  if (import.meta.env.DEV && error instanceof Error) stack = error.stack;

  return (
    <main className="mx-auto pt-16 p-4 text-center">
      <h1>{message}</h1>
      <p>{details}</p>
      <p className="text-gray-500">{t('errorBoundary')}</p>
      {stack && <pre className='w-full p-4'><code>{stack}</code></pre>}
    </main>
  )
}
