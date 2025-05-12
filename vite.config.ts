import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { reactRouterHonoServer } from 'react-router-hono-server/dev'
import { reactRouterDevTools } from 'react-router-devtools'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    reactRouterHonoServer(),
    reactRouterDevTools(),
    reactRouter(),
    tailwindcss(),
  ],
})
