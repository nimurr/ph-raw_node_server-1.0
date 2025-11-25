import http, { IncomingMessage, Server, ServerResponse } from "http";
import config from "./config";


const aboutData = {
    company: "My Company",
    address: "My Address",
    location: "Dhaka Bangladesh",
    phone: "1234567890"
}

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log('server is running....');

    //? Primary page route
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200,
            { 'Content-Type': 'application/json' }
        )
        res.end(JSON.stringify({
            message: 'Hello World',

            status: 200,
            path: req.url
        }));
    }
    //? about page route
    if (req.url == "/about" && req.method == "GET") {
        res.writeHead(200,
            { 'Content-Type': 'application/json' }
        )
        res.end(JSON.stringify({
            message: 'About Page Get is Ok',
            success: true,
            status: 200,
            data: aboutData,
        }));
    }

    //? create post api 
    if (req.url == "/post" && req.method == "POST") {

    }



});

server.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
})
