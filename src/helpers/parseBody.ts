import { IncomingMessage } from "http";

async function parseBody(req: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk: any) => {
            body += chunk;
        });
        req.on("end", () => {
            try {
                const user = JSON.parse(body);
                resolve(user);

            } catch (error) {
                reject(error);
            }
        });
        req.on("error", (error: any) => {
            reject(error);
        })
    });
}

export default parseBody