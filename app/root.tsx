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

export default function App() {
  const { locale } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()

  useChangeLanguage(locale)

  return (
    <html
      className="overflow-y-auto overflow-x-hidden"
      lang={i18n.language}
      dir={i18n.dir()}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="w-full h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
