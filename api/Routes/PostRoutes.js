const userController = require("../Controllers/UserController");

module.exports = (request=null, response=null) => {
    if(request===null || response===null){
        console.log("Either request or response not send in post routes methods")
    }

    const pathname = request.url_obj.pathname;
    const body_data = request.body_data;

    switch(pathname){

        case "/user-register":
            userController.userRegister(request, response);
            break;
        case "/user-login":
            userController.userLogin(request, response);
            break;
        default:
            response.writeHead(400, { "Content-Type": "application/json" });
            response.write("Bad(post) method request url call");
            response.end();
            break;
    }


}