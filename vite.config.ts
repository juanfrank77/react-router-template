import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [
        reactRouter({
            ignoredRouteFiles: ["**/*.css"],
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_lazyRouteDiscovery: true,
                v3_routeConfig: true,
                v3_throwAbortReason: true,
                v3_singleFetch: true
            }
        }),
        tsConfigPaths()
    ],
})