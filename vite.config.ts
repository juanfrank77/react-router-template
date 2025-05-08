import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { reactRouterHonoServer } from 'react-router-hono-server/dev'
import { reactRouterDevTools } from 'react-router-devtools'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    reactRouterHonoServer(),
    reactRouterDevTools(),
    reactRouter(),
    iconsSpritesheet({
      withTypes: true,
      inputDir: './resources/icons',
      outputDir: './public/icons',
      fileName: 'icons.svg',
      formatter: 'prettier',
    }),
  ],
})
