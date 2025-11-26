import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helpers/RouteHandler";


const aboutData = {
    company: "My Company",
    address: "My Address",
    location: "Dhaka Bangladesh",
    phone: "1234567890"
}

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log('server is running....');

    //? Primary page route
    // if (req.url === '/' && req.method === 'GET') {
    //     res.writeHead(200,
    //         { 'Content-Type': 'application/json' }
    //     )
    //     res.end(JSON.stringify({
    //         message: 'Hello World',

    //         status: 200,
    //         path: req.url
    //     }));
    // }
    //? about page route
    // if (req.url == "/about" && req.method == "GET") {
    //     res.writeHead(200,
    //         { 'Content-Type': 'application/json' }
    //     )
    //     res.end(JSON.stringify({
    //         message: 'About Page Get is Ok',
    //         success: true,
    //         status: 200,
    //         data: aboutData,
    //     }));
    // }

    //? create post api 
    // if (req.url == "/api" && req.method == "GET") {
    //     res.writeHead(200,
    //         { 'Content-Type': 'application/json' }
    //     )
    //     res.end(JSON.stringify({
    //         message: 'Health Status is Ok',
    //         success: true,
    //         status: 200,
    //         data: aboutData,
    //     }))
    // }

    //? create post api for users
    // if (req.url == "/api/users" && req.method == "POST") {
    //     // const user = {
    //     //     id: 1,
    //     //     name: "John Doe",
    //     //     email: "3oXoZ@example.com",
    //     //     address: "Dhaka Bangladesh"
    //     // }
    //     // res.writeHead(200,
    //     //     { 'Content-Type': 'application/json' }
    //     // )
    //     // res.end(JSON.stringify(user))

    //     // let body = '';
    //     // req.on('data', chunk => {
    //     //     body += chunk;
    //     // });
    //     // req.on('end', () => {
    //     //     const user = JSON.parse(body);
    //     //     res.writeHead(200,
    //     //         { 'Content-Type': 'application/json' }
    //     //     )
    //     //     res.end(JSON.stringify(user))
    //     // });


    //     let body = '';
    //     req.on("data", chunk => {
    //         body += chunk;
    //     })
    //     req.on("end", () => {
    //         const user = JSON.parse(body);
    //         res.writeHead(200,
    //             { 'Content-Type': 'application/json' }
    //         )
    //         res.end(JSON.stringify(user))
    //     })


    // }

    //!====== Apply api using Dynamic Route Handler 

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler : RouteHandler | undefined = methodMap?.get(path);

    if (handler) {
        handler(req, res);
    } else {
        res.writeHead(404,
            { 'Content-Type': 'application/json' }
        )
        res.end(JSON.stringify({
            message: 'Route Not Found',
            success: false,
            status: 404
        }))
    }

    addRoutes("GET", '/', (req, res) => {
        res.writeHead(200,
            { 'Content-Type': 'application/json' }
        )
        res.end(JSON.stringify({
            message: 'About Page Get is Ok',
            success: true,
            status: 200,
            data: aboutData,
        }));
    })



});

server.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
})
