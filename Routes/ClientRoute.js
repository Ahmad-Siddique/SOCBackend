const Controllers = require("../Controllers/ClientController");
const ClientControllers = require("../Controllers/ClientController");
const express = require("express");
const router = express.Router();

// Client
router.post("/api/clientregister", ClientControllers.clientRegisterController);
router.get("/api/clientall", ClientControllers.clientAllController);
router.post("/api/deleteclient/:id", ClientControllers.clientDeleteController);
router.post("/api/updateclient/:id", ClientControllers.clientUpdateController);
router.get("/api/getoneclient/:id", Controllers.clientOneController);


module.exports = router;