import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import { reactRouterHonoServer } from "react-router-hono-server/dev";
import { iconsSpritesheet } from "vite-plugin-icons-spritesheet";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        reactRouter(),
        tsConfigPaths(),
        reactRouterHonoServer(),
        iconsSpritesheet(
            {
                withTypes: true,
                inputDir: "icons",
                outputDir: "./public/icons",
                fileName: "icons.svg",
                formatter: "prettier",
            }
        ),
    ],
})