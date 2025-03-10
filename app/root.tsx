import {
  type LinksFunction,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from 'remix-i18next/react'
import i18next from './localization/i18n.server'
import styles from '~/tailwind.css?url'
import { themeSessionResolver } from './utils/session.server'

export async function loader({
  context,
  request,
}: {
  context: any
  request: Request
}) {
  const { lang, clientEnv } = context
  const locale = await i18next.getLocale(request)
  const themeSession = await themeSessionResolver(request)
  return { lang, clientEnv, locale, theme: themeSession.getTheme() }
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
  const { theme } = useLoaderData()
  return (
    <ThemeProvider
      specifiedTheme={theme}
      themeAction='/action/set-theme'
      disableTransitionOnThemeChange={true}
    >
      <html className="overflow-y-auto overflow-x-hidden" lang={lang} dir={dir} data-theme={theme ?? ""}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
          <Links />
        </head>
        <body className="w-full h-full">
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
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

  return (
    <div className="mx-auto p-12 text-center">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  )
}
