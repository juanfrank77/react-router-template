import { createHonoServer } from "react-router-hono-server/node"
import { getLoadContext } from "./context"

export default await createHonoServer({
    configure(server) {
        server.use("*")
    },
    defaultLogger: false,
    getLoadContext,
})
