const queryString = require("querystring");

module.exports = (request, response, function_as_argument) => {
    if(request===null || response===null){
        console.log("Either request or response not send in middleware methods");
    }

    let body_data = [];
    request.on('data', (dataCunk) => {
        body_data.push(dataCunk);
    })

    request.on("end", () => {
        body_data = Buffer.concat(body_data).toString();

        if(request.headers["content-type"]==="application/json"){
            body_data = JSON.parse(body_data)
        }else{
            body_data = queryString.parse(body_data);
        }

        request.body_data = body_data;

        function_as_argument(request, response);
    })

}