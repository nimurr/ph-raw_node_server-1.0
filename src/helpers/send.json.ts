function sendJson(res: any, statusCode: number, data: any) {
    res.writeHead(
        statusCode,
        { 'Content-Type': 'application/json' }
    )
    res.end(JSON.stringify(data))
}

export default sendJson