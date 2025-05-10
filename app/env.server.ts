import { z } from 'zod'

type ServerEnv = z.infer<typeof envSchema>
let env: ServerEnv

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    API_ENV: z.enum(['development', 'staging', 'production']).default('development'),
})

function initEnv() {
    const envData = envSchema.safeParse(process.env)

    if (!envData.success) {
        console.error("Invalid environment variables:", envData.error.flatten().fieldErrors)
        throw new Error('Invalid environment variables')
    }

    env = envData.data
    Object.freeze(env)

    return env
}

export function getServerEnv(): ServerEnv {
    return env ?? initEnv()
}

export function getClientEnv() {
    const serverEnv = getServerEnv()
    return {
        NODE_ENV: serverEnv.NODE_ENV,
    }
}

type ClientEnv = ReturnType<typeof getClientEnv>

declare global {
    interface Window {
        env: ClientEnv
    }
}