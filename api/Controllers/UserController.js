const fs = require("fs");

const file_name = "db_files/users.json";
const fileData = fs.readFileSync(file_name);
let file_obj = JSON.parse(fileData);

const file_length = file_obj.length;
let last_index = (file_length==0) ? 0 : file_obj[file_length-1].id;

/*****
 * User Register Function
 */

const userRegister = (request, response) => {
    let body_data = request.body_data;

    let name = body_data.name;
    let phone = body_data.phone;
    let email = body_data.email;
    let pass = body_data.password;
    let otp = Math.floor(Math.random()*1000000);
    let otp_status = 0;
    let user_status = 0;
    let login_status = 0;
    let count=0;

    let msg = "";
    if(!name || !phone || !email || !pass){
        msg = {status:"error", msg: "Name, phone, email, password fields are required."};
        response.writeHead(400,{"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;
    }

    file_obj.filter((row_obj, index) => {
        if(row_obj.email===email){
            msg = {status:"error", msg: "Please try another email address."};
            response.writeHead(400, {"Content-Type":"application/json"});
            response.end(JSON.stringify(msg, null, 3));
            count++
            return false;
        }

        if(row_obj.phone===phone){
            msg = {status:"error", msg: "Please try another phone number."};
            response.writeHead(400, {"Content-Type":"application/json"});
            response.end(JSON.stringify(msg, null, 3));
            count++
            return false;            
        }
    })

    if(count>0){
        response.end();
        return false;
    }

    const param = {id:++last_index, name:name, phone:phone, email:email, pass:pass, otp:otp, otp_status:otp_status, user_status:user_status, login_status:login_status};
    file_obj.push(param);

    fs.writeFile(file_name, JSON.stringify(file_obj, null, 5), (err)=>{
        if(err){
            msg = {status:"error", msg: "Your data could not be persist, please try again"};
            response.writeHead(400, {"Content-Type":"application/json"});
            response.end(JSON.stringify(msg, null, 3));
            throw err;
            return false;
        }

        msg = {status:"error", msg: "Sucessfully registered with us."};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;
    })

};
/******End User Register function Her */

/****
 * User Login Function
 */

const userLogin = (request, response) => {
    const body_data = request.body_data;
    let email = body_data.email;
    let pass = body_data.password;
    let name = "";
    let phone = "";
    let user_id = 0;
    let count = 0;
    let param = "";
    let login_status = 1;
    if(!email || !pass){
        msg = {status:"error", msg: "Email and password fields are required."};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.write(JSON.stringify(msg, null, 3));
        response.end();
    }

    file_obj.filter((row_obj, index) => {
        if(row_obj.email===email && row_obj.pass==pass){
            file_obj[index].login_status = login_status;
            user_id = row_obj.id;
            name = row_obj.name;
            phone = row_obj.phone;
            param = {user_id:user_id, name:name, phone:phone, login_status:login_status,}
            count++;
        }
    })

    if(count===0){
        msg = {status:"error", msg: "Please enter your valid login detail."};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;
    }

    if(count>0 && user_id>0){
        fs.writeFile(file_name, JSON.stringify(file_obj, null, 5), (err) => {
            if(err){
                throw err;                
            }
        })
        msg = {status:"success", msg: "Successfully login.", user_detail:param};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;  
    }
}
/******End User login function */

/****
 * Single user detail getting with id
 */
const userDetail = (request, response) => {
    const url_obj = request.url_obj;
    const user_id = url_obj.searchParams.get("id");
    let user_detail_param = [];
    let count = 0;
    if(!user_id || isNaN(user_id)){
        msg = {status:"error", msg: "Your request does not have user id either invlaid user id"};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;          
    }

    if(!isNaN(user_id) && user_id>0){
        file_obj.forEach((row_obj, index) => {
            if(row_obj.id==user_id){
                user_detail_param.push(row_obj);
                return false;
            }
        })
    }

    if(user_detail_param.length>0){
        msg = {status:"success", msg: "Your fetch user", user_detail:user_detail_param};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;         
    }else{
        msg = {status:"error", msg: "User id not exist", user_detail:user_detail_param};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false;           
    }
}
/**** End here getting single user detail getting */

/*****
 * Delete User function
 */
const userDelete = (request, response) => {
    const id = request.url_obj.searchParams.get("id");
    let count = 0;
    if(!id && isNaN){
        const msg = {status:"error", msg:"Your delete action not perform either not exist id or invalid data search."};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false
    }

    if(id){
        file_obj.forEach((row_data, index) => {
            if(row_data.id==id){
                file_obj.splice(index, 1);
                count++
            }
        })

        if(count>0){
            fs.writeFile(file_name, JSON.stringify(file_obj, null, 5), (err)=>{
                if(err){throw err}                
                const msg = {status:"success", msg:"Users successfully  deleted", users_list:file_obj};
                response.writeHead(200, {"Content-Type":"application/json"});
                response.end(JSON.stringify(msg, null, 3));
                return false
            })
        }else{
            const msg = {status:"error", msg:"Data not found"};
            response.writeHead(200, {"Content-Type":"application/json"});
            response.end(JSON.stringify(msg, null, 3));
            return false
        }
    }
}
/**** End here delete user function */

/****
 * Getting Users List
 */
const usersList = (request, response) => {
    if(file_obj.length>0){
        const msg = {status:"success", msg:"Users list found", users_list:file_obj};
        response.writeHead(200,{"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
    }else{
        const msg = {status:"error",msg:"Uaser list data not found"}
        response.writeHead(200,{"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
    }
}

/****
 * Update Users detail
 */
const updateUserDetail = (request, response) => {
    const body_data = request.body_data;
    const id = request.url_obj.searchParams.get("id");

    const name = body_data.name;
    const email = body_data.email;
    const phone = body_data.phone;
    const pass = body_data.password;
    const uxid = (id) ? id : body_data.id;

    let count = 0;
    let updatedParams = [];
    let prx = [];
    if(!uxid && isNaN){
        const msg = {status:"error", msg:"Your delete action not perform either not exist id or invalid data search."};
        response.writeHead(200, {"Content-Type":"application/json"});
        response.end(JSON.stringify(msg, null, 3));
        return false
    }

    file_obj.forEach((row_data, index)=>{
        if(row_data.id==uxid){
            if(name){
                file_obj[index].name = name;
                updatedParams.push(name);
                count++;
            }
            if(email){
                file_obj[index].email = email;
                updatedParams.push(email);
                count++;
            }
            if(phone){
                file_obj[index].phone = phone;
                updatedParams.push(phone);
                count++
            }
            if(pass){
                file_obj[index].pass = pass;
                updatedParams.push(pass);
                count++;
            }
            prx = row_data;
        }

        if(count>0){
            const msg = {status:"success", msg:"User detail successfully updated", user_data:prx};
            response.writeHead(200, {"Content-Type":"application/json"});
            response.end(JSON.stringify(msg, null, 3));
            return false            
        }else{
            const msg = {status:"error", msg:"Data not updated"};
            response.writeHead(200, {"Content-Type":"application/json"});
            response.end(JSON.stringify(msg, null, 3));
            return false
        }
    })


}


module.exports = {userRegister:userRegister, userLogin:userLogin, userDetail:userDetail, userDelete:userDelete, usersList:usersList, updateUserDetail:updateUserDetail};