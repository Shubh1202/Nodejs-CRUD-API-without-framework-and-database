# Nodejs-CRUD-API-without-framework-and-database
Shubham Prajapati 9807272530 (Software Developer)
Node js API flow structure without Framework and Database
This is node js API crud operation flow structure for understanding the node js work flow. In this API only node js http module, file system moule, queryString module and url module is used.

Firstly instal node js: Install Node js

After install download this folder and place this folder on your drive where you want to exectue your project

Example: My drive is D, the the path of my/your pc is D:\\api>

Now type "node server" Like-: D:\\api>node server and press enter

API URL and Methods
Note: Register any dummy user with given parameter: name, phone, email, password

All data save in "user.json" file => db_files/user.json

<h5>POST method routes </h5>
<p>User Register url: http://localhost:9090/user-register</p>
<p>User Login url: http://localhost:9090/user-login </p>

<h5>GET method routes</h5>
<p>Get all users list url: http://localhost:9090/users-list</p>
<p>Get Single users data url: http://localhost:9090/user-detail?id=2</p>
<h5>PUT method routes</h5>
<p>Update Single user data url: http://localhost:9090/update-user-detail?id=1</p>
<h5>DELETE method routes</h5>
<p>Delete Single user data url: http://localhost:9090/delete-user?id=1</p>
