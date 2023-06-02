const http = require("http");
const url = require("url");
const queryString = require("querystring");

const middleware = require("./middleware");
const getRoutes = require("./Routes/GetRoutes");
const postRoutes = require("./Routes/PostRoutes");
const putRoutes = require("./Routes/PutRoutes");
const deleteRoutes = require("./Routes/DeleteRoutes");

const PORT = process.env.PORT || 9090;
const host = "127.0.0.1";

http.createServer((request, response) => {

    const url_obj = new URL(request.url, `http://${request.headers.host}`);
    request.url_obj = url_obj;

    switch (request.method) {
        case "GET":
            middleware(request, response, getRoutes);
            break;

        case "POST":
            middleware(request, response, postRoutes);
            break;

        case "PUT":
            middleware(request, response, putRoutes);
            break;

        case "DELETE":
            middleware(request, response, deleteRoutes);
            break;

        default:
            response.writeHead(400, { "Content-Type": "application/josn" });
            response.write("Bad request call");
            response.end();
            break;

    }

}).listen(PORT, err => {
    if (err) {
        console.log(`Your server not listen on port ${PORT}`);
        throw err
    }
    console.log(`Your app running URL : http://${host}:${PORT}`);
})