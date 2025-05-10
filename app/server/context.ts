import type { Context } from "hono"
import { i18next } from "remix-hono/i18next"
import { getServerEnv, getClientEnv } from "../env.server"

export const getLoadContext = async (context: Context) => {
    const locale = i18next.getLocale(context)
    const t = await i18next.getFixedT(context)
    const env = getServerEnv()
    return {
        lang: locale,
        t,
        env,
        clientEnv: getClientEnv(),
        body: context.body,
    }
}

interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> { }

declare module "react-router" {
    interface AppLoadContext extends Omit<LoadContext, "body"> { }
}