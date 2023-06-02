// exports.GetController  = (request, response) => {
//     response.writeHead(200, {"Content-Type":"applicaion/josn"});
//     response.end("Get method call");
// }
const fs = require("fs");
const userController = require("../Controllers/UserController");



module.exports = (request = null, response = null) => {
    if (request === null || response === null) {
        console.log("Either request or response not send in get routes methods");
    }

    const request_path = request.url_obj.pathname;

    switch (request_path) {
        case '/':
            fs.readFile("index.html", (err, html)=>{
                if(err){throw err}
                response.writeHead(200, { "Contnet-Type": "text/html" });
                response.write(html);
                response.end();
            })
            break;
        case "/user-detail":
            userController.userDetail(request, response);
            break;
        case "/users-list":
            userController.usersList(request, response);
            break;
        default:
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write("Bad method request url call");
            response.end();
            break;
    }
}