import { PassThrough } from 'stream'
import { createReadableStreamFromReadable } from '@react-router/node'
import { createInstance } from 'i18next'
import { isbot } from 'isbot'
import { renderToPipeableStream } from 'react-dom/server'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import i18next from './localization/i18n.server'
import i18n from './localization/i18n'
import { type EntryContext, ServerRouter } from 'react-router'

export const streamTimeout = 10000

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  context: EntryContext
) {
  const callbackName = isbot(request.headers.get('user-agent'))
    ? 'onAllReady'
    : 'onShellReady'
  const instance = createInstance()
  const lng = await i18next.getLocale(request)
  const ns = i18next.getRouteNamespaces(context as any)

  await instance
    .use(initReactI18next) // Tell our instance to use react-i18next
    .init({
      ...i18n,
      lng,
      ns,
      backend: {
        loadPath: './public/locales/{{lng}}/{{ns}}.json',
      },
    })

  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={instance}>
        <ServerRouter context={context} url={request.url} />
      </I18nextProvider>,
      {
        [callbackName]: () => {
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)
          responseHeaders.set('Content-Type', 'text/html')

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          pipe(body)
        },
        onShellError: (error) => {
          reject(error)
        },
        onError: (error) => {
          responseStatusCode = 500
          didError = true
          console.error(error)
        },
      }
    )
    setTimeout(abort, streamTimeout + 1000)
  })
}
