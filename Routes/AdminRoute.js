const Controllers = require("../Controllers/UserController");
const AdminController = require("../Controllers/AdminController");
const express = require("express");
const router = express.Router();

// Client
router.post("/api/adminregister", AdminController.AdminRegisterController);
router.post("/api/adminlogin", AdminController.AdminLoginController);
router.post("/api/deleteadmin/:id", AdminController.AdminDeleteController);
router.post("/api/updateadmin/:id", AdminController.AdminUpdateController);
router.get("/api/alladmins", AdminController.AdminAllController);
router.get("/api/getoneadmin/:id", AdminController.AdminOneAdmin);

module.exports = router;
