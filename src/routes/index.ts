import parseBody from "../helpers/parseBody"
import addRoutes from "../helpers/RouteHandler"
import sendJson from "../helpers/send.json"

addRoutes("GET", '/', (req, res) => {
    sendJson(res, 200, {
        message: 'Hello World',
        path: req.url,
    })
})

addRoutes("GET", '/about', (req, res) => {
    sendJson(res, 200, {
        message: 'About Page Get is Ok',
        success: true,
    })
})

addRoutes("POST", '/api', async (req, res) => {
    const user = await parseBody(req)
    sendJson(res, 200, user)
})
