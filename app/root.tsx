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

export function ErrorBoundary() {
  const { i18n } = useTranslation()
  return (
    <div className="mx-auto p-12 text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  )
}
