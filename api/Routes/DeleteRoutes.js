const userController = require("../Controllers/UserController");

module.exports = (request = null, response = null) => {
    if (request === null || response === null) {
        console.log("Either request or response not send in delete routes methods")
    }

    const pathname = request.url_obj.pathname;

    switch (pathname) {
        case "/":
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write("Welcome in node js API");
            response.end();
            break;
        case "/delete-user":
            userController.userDelete(request, response);
            break;
        default:
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write("Bad method request url call");
            response.end();
            break;
    }
}