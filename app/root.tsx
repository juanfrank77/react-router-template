import {
  type LinksFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'
import i18next from './localization/i18n.server'
import styles from '~/tailwind.css?url'
import { Route } from './+types/root'

export async function loader({
  context,
  request,
}: {
  context: any
  request: Request
}) {
  const { lang, clientEnv } = context
  const locale = await i18next.getLocale(request)
  return { lang, clientEnv, locale }
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const handle = {
  i18n: 'common',
}

export function Layout({
  children,
  lang,
  dir,
}: {
  children: React.ReactNode
  lang?: string
  dir?: string
}) {
  return (
    <html className="overflow-y-auto overflow-x-hidden" lang={lang} dir={dir}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

  useChangeLanguage(locale)

  return (
    <Layout lang={locale} dir={i18n.dir()}>
      <Outlet />
    </Layout>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Sorry, an unexpected error has occurred.";
  let stack: string | undefined;

  const { i18n } = useTranslation()

  if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="mx-auto pt-16 p-4 text-center">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && <pre className='w-full p-4'><code>{stack}</code></pre>}
      <p className="text-gray-500">{i18n.t('errorBoundary')}</p>
    </main>
  )
}
