const Controllers = require("../Controllers/ClientController");
const TaskControllers = require("../Controllers/TaskController");
const express = require("express");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "../app/frontend/build/uploads");
     callback(null, "../frontend/public/uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


router.post("/api/taskregister",upload.single('taskfile'), TaskControllers.TaskCreation);
router.get("/api/alltasks", TaskControllers.TaskAllController);
router.post("/api/deletetasks/:id", TaskControllers.TaskDeleteController);
router.post(
  "/api/updatetasks/:id",
  
  TaskControllers.TaskUpdateController
);

router.post("/api/updatetaskfile/:id", upload.single("taskfile"), TaskControllers.TaskUpdateFileController);
router.get("/api/onetask/:id", TaskControllers.TaskOneController);
router.get("/api/taskclients", TaskControllers.TaskClientsController);
router.get("/api/taskusers", TaskControllers.TaskUserController);
router.get("/api/taskoneuser/:id", TaskControllers.TaskOneUserController);
router.get("/api/taskoneclient/:id", TaskControllers.TaskOneClientController);
router.get("/api/taskopen", TaskControllers.TaskOpenController);
router.post("/api/claimtask/:id", TaskControllers.TaskClaimUserController);
router.post(
  "/api/updatestatus/:id",
  TaskControllers.TaskChangeStatusController
);
router.post(
  "/api/updatemessage/:id",
  TaskControllers.TaskMessagesUpdateController
);
router.post("/api/updateusers/:id", TaskControllers.TaskUpdateUsersController);
router.post("/api/taskexist", TaskControllers.TaskExistController);
router.post("/api/transfertask/:id", TaskControllers.TransferTaskController);
router.get("/api/usertransfertask/:id", TaskControllers.TaskUserTransfer);
router.get("/api/taskrecurring", TaskControllers.TaskRecurringTask);

module.exports = router;