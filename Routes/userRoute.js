const Controllers = require('../Controllers/UserController')
const ClientControllers = require("../Controllers/ClientController");
const express = require('express')
const router=express.Router()


// User
router.post("/api/user/register", Controllers.userRegisterController);
router.post("/api/user/login", Controllers.userLoginController);
router.get("/api/user/allusers", Controllers.userAllController);
router.post("/api/user/updateuser/:id", Controllers.userUpdateController);
router.post("/api/user/deleteuser/:id", Controllers.userDeleteController);
router.get("/api/user/getoneuser/:id", Controllers.userOneController);


module.exports=router
