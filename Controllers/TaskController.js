const taskModel = require("../Models/TaskModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");
const clientModel = require("../Models/ClientModel");
const userModel = require("../Models/UserModel");

const TaskCreation = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const {createdby, name,description, clients, users,recurringtask } = req.body;
  // console.log(req.body);
  // const createdby1 = JSON.stringify(createdby)
  console.log(createdby,clients,users)
  const createdby1 = JSON.parse(createdby)
  const clients1 = JSON.parse(clients);
  const users1 = JSON.parse(users);
  console.log("ggwp");
  let status="UnAssigned"
  if (users!={}) {
    status="Assigned"
  }
  var date = new Date();
  var current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  
    
  if (req.file !== undefined) {
    const taskcreate = await taskModel.create({
      createdby: createdby1,
      name,
      description,
      status,
      clients: clients1,
      users: users1,
      recurringtask,
      date:current_date,
      taskfile: req.file.originalname,
    });

    if (taskcreate) {
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,
        createdby: taskcreate.createdby,
        description: taskcreate.description,
        name: taskcreate.name,
        status: taskcreate.status,
        clients: taskcreate.clients,
        users: taskcreate.users,
        recurringtask: taskcreate.recurringtask,
        date:current_date,
        taskfile: taskcreate.taskfile,
        token: generateToken(taskcreate._id),
      });
    }
  }
  else {
    const taskcreate = await taskModel.create({
      createdby: createdby1,
      name,
      description,
      status,
      clients: clients1,
      users: users1,
      date:current_date,
      recurringtask,
      
    });

    if (taskcreate) {
    
  
      console.log(taskcreate);
      res.json({
        _id: taskcreate._id,
        createdby: taskcreate.createdby,
        description: taskcreate.description,
        name: taskcreate.name,
        status: taskcreate.status,
        clients: taskcreate.clients,
        users: taskcreate.users,
        date:taskcreate.date,
        recurringtask: taskcreate.recurringtask,
        
        token: generateToken(taskcreate._id),
      });
    }
  }
});


const TaskAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task");
  const Task = await taskModel.find().sort({createdAt:-1});
  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Tasks Available");
  }
});


const TaskDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const Task = await taskModel.findById( id );
  console.log(Task);
  if (Task) {
    await Task.remove();
    res.json({ message: "Task has been removed" });
  } else {
    throw new Error("Error Occured. Task Not deleted");
  }
});

const TaskUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, description, status, users,recurringtask } = req.body
  console.log("Request body")
  console.log(req.body)

  const id = req.params.id;

  const Task = await taskModel.findById(id);
  console.log("Task to be updated")
  console.log(Task);
  if (Task) {
    console.log("Updating")
    Task.name = name;
    Task.description = description
    Task.status = status
    Task.recurringtask=recurringtask
    Task.users = users;
    
    
    console.log("Updated Task")
    const updatedTask = await Task.save();
    console.log("task saved")
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});


const TaskUpdateFileController = asyncHandler(async (req, res) => {
  console.log("Get file Req accepted");
  const { users } = req.body
  const users1 = JSON.parse(users)
  const id = req.params.id;
  console.log(req.file.originalname);
  console.log(users1)
  const Task = await taskModel.findById(id);
 
  console.log(Task);
  if (Task) {
    
    Task.taskfile = req.file.originalname;
    if (!Task.users) {
      Task.users = users1;
    }
    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});




const TaskOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const Task = await taskModel.findById(id);


  console.log(Task);
  if (Task) {
    res.json(Task);
  } else {
    res.status(400);
    throw new Error("No Task Available");
  }
});

const TaskClientsController = asyncHandler(async (req, res) => {
  
  console.log("Get Req accepted");
  const client = await clientModel.find()
  const tasks = await taskModel.find();
  var clienttask=[]

  for (var i = 0; i < client.length; i++){
  var taskassigned=[]
    var id = String(client[i]._id)
    for (var j = 0; j < tasks.length; j++){
      var found = tasks[j].clients.find((elem) => {
        var data = elem
        data.value=String(data.value) 
        
      
        
       
        return data.value === id
      })
      if (found) {

        taskassigned = [...taskassigned, tasks[j]]
      }
    }
    clienttask = [...clienttask, { name: client[i].name, _id: client[i]._id, tasks: taskassigned }]
   

  }

  res.json(clienttask)



  
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});








const TaskUserController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const user = await userModel.find();
  const tasks = await taskModel.find();
  var usertask = [];
  
  for (var i = 0; i < user.length; i++) {
    var taskassigned = [];
    var id = String(user[i]._id);
    for (var j = 0; j < tasks.length; j++) {
      var found = tasks[j].users.find((elem) => {
        var data = elem;
        data.value = String(data.value);

        return data.value === id;
      });
      if (found) {
        taskassigned = [...taskassigned, tasks[j]];
      }
    }
    usertask = [
      ...usertask,
      { name: user[i].name, _id: user[i]._id, tasks: taskassigned },
    ];
  }

  res.json(usertask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});



const TaskOneUserController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const id = req.params.id;
  console.log()
  const user = await userModel.findById(id);
  const tasks = await taskModel.find();
  var usertask = [];

  
  let taskassigned=[]
    
  for (var j = 0; j < tasks.length; j++) {
    if (tasks[j].users){
      var found = tasks[j].users.value === id;
       

        
      
    if (found) {
      taskassigned = [...taskassigned, tasks[j]];
    }
  }
  }
  console.log()
    usertask = [
      ...usertask,
      { name: user.name, _id: id, tasks: taskassigned },
    ];
  

  res.json(usertask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});







const TaskOneClientController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const id = req.params.id;
  console.log();
  const client = await clientModel.findById(id);
  const tasks = await taskModel.find();
  var clienttask = [];

  let taskassigned = [];

  for (var j = 0; j < tasks.length; j++) {
    var found = tasks[j].clients.find((elem) => {
      var data = elem;

      return data.value === id;
    });
    if (found) {
      taskassigned = [...taskassigned, tasks[j]];
    }
  }
  console.log();
  clienttask = [...clienttask, { name: client.name, _id: id, tasks: taskassigned }];

  res.json(clienttask);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});



const TaskOpenController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  
  console.log();
  
  const tasks = await taskModel.find();
  var clienttask = [];

  let taskassigned = [];

  for (var j = 0; j < tasks.length; j++) {
    if (!tasks[j].users) {
      taskassigned= [...taskassigned,tasks[j]]
    }
  }
  console.log();

  res.json(taskassigned);

  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});


const TaskClaimUserController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Claim");
  const { name, value, label} = req.body;
  const id = req.params.id;
  console.log();

  const Task = await taskModel.findById(id);
   if (Task) {
     Task.users = {name,value,label};
     Task.status = "Assigned"

     console.log("Updated Task");
     const updatedTask = await Task.save();
     res.json(updatedTask);
   } else {
     res.status(400);
     throw new Error("Update Not Done");
   }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});



const TaskChangeStatusController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Status");
  const { status } = req.body;
  const id = req.params.id;
  console.log(status)
  console.log();

  const Task = await taskModel.findById(id);
  if (Task) {
  
    Task.status = status;

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});


const TaskMessagesUpdateController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task Message Update");
  const { name,_id,message } = req.body;
  const id = req.params.id;
  console.log();

  const Task = await taskModel.findById(id);
  if (Task) {
    Task.comments = [...Task.comments,{name,_id,message}];

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});


const TaskUpdateUsersController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Update Task User");
  const { users } = req.body;
  const id = req.params.id;
  console.log
  console.log(users);

  const Task = await taskModel.findById(id);
  if (Task) {
    Task.users = users

    console.log("Updated Task");
    const updatedTask = await Task.save();
    res.json(updatedTask);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});


const TaskExistController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Task Exist");
  const { name } = req.body;
 

  const Task = await taskModel.find({ name });
  console.log(Task)
  if (Task.length==0) {
    res.json({message:"No"})
  } else {
    res.json({message:"Yes"})
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});


const TransferTaskController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted Transfer Task");
  const { transferredby,users } = req.body;
  const id = req.params.id;
   const Task = await taskModel.findById(id);
   if (Task) {
     Task.users = users;
     Task.transferredby = transferredby;
     console.log("Updated Task");
     const updatedTask = await Task.save();
     res.json(updatedTask);
   } else {
     res.status(400);
     throw new Error("Update Not Done");
   }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});


const TaskUserTransfer = asyncHandler(async (req, res) => {
  console.log("Get Req accepted User Transfer");
  const { transferredby, users } = req.body;
  const id = req.params.id;
  const Task = await taskModel.find({ status: "Assigned" });
  let data=[]
  if (Task) {

    
    for (var i = 0; i < Task.length; i++){
      if (Task[i].transferredby) {
        if (Task[i].transferredby.value === id) {
          data = [...data, Task[i]];
        }
      }
      
    }

    res.json(data)

  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
});



const TaskRecurringTask = async (hours) => {
  console.log("Get Req accepted Recurr");
  
  const Task = await taskModel.find().sort({name:-1});
  let data = [];
  if (Task) {
    for (var i = 0; i < Task.length; i++) {
      if (Task[i].recurringtask == hours) {
        
          Task[i].status="UnAssigned"
          await Task[i].save()
      }
    }
    console.log(Task)

    // res.json(Task);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
  // if (Task) {
  //   res.json(Task);
  // } else {
  //   res.status(400);
  //   throw new Error("No Task Available");
  // }
}









module.exports = {
  TaskOneController,
  TaskCreation,
  TaskAllController,
  TaskDeleteController,
  TaskUpdateController,
  TaskClientsController,
  TaskUserController,
  TaskOneUserController,
  TaskOneClientController,
  TaskOpenController,
  TaskClaimUserController,
  TaskChangeStatusController,
  TaskMessagesUpdateController,
  TaskUpdateUsersController,
  TaskExistController,
  TransferTaskController,
  TaskUserTransfer,
  TaskRecurringTask,
  TaskUpdateFileController,
};
