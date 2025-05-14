import type { Context } from "hono"
import { getServerEnv, getClientEnv } from "../env.server"

export const getLoadContext = async (context: Context) => {
    const env = getServerEnv()
    return {
        env,
        clientEnv: getClientEnv(),
        body: context.body,
    }
}

interface LoadContext extends Awaited<ReturnType<typeof getLoadContext>> { }

declare module "react-router" {
    interface AppLoadContext extends Omit<LoadContext, "body"> { }
}