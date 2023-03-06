const express = require("express");
// const notes = require("./data/notes");
const mongoose = require("mongoose");
const Controllers = require("./Controllers/UserController");
const userRouter = require("./Routes/userRoute");
const clientRouter = require("./Routes/ClientRoute");
const adminRouter = require("./Routes/AdminRoute");
const taskRouter = require("./Routes/TaskRoute");
const TaskControllers = require("./Controllers/TaskController");
const path = require("path");
const serverstate = "Production";
// const __dirname = dirname(__filename);
// console.log(__dirname);

// const { notFound, errorHandler } = require("./middlewares/errorHandlers");
var port = process.env.PORT || 5000;
const app = express();
// const cors = require("cors");

// app.use(
//   cors({
//     origin: "*",
//   })
// );

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

var cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
// use it before all route definitions
// app.use(function (request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const mongo_connection = mongoose
  .connect(
    "mongodb+srv://Abishek:Abishek123@cluster0.rr49qah.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((conn) => {
    console.log("Connected to the database", conn.connection.host);
  })
  .catch((err) => {
    console.log("error occured", err);
  });

// app.get("/api/notes", (req, res) => {
//   res.json(notes);
// });

// // app.post('/user',Controllers.userController)

// app.get("/api/notes/:id", (req, res) => {
//   const id = req.params.id;
//   const note = notes.find((n) => n._id === id);

//   res.send(note);
// });

var cron = require("node-cron");

cron.schedule(
  "0 */1 * * *",
  () => {
    const now = new Date();
    const current = now.getHours();
    console.log(current);
    console.log("GGWP");
    try {
      TaskControllers.TaskRecurringTask(current);
      console.log("Running a job at 1 min at Asia/Kolkata timezone");
    } catch (e) {
      console.log(e);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  }
);

// app.get("/", (req, res) => {

//   res.send('note');
// });

app.use(userRouter);
app.use(clientRouter);
app.use(adminRouter);
app.use(taskRouter);

// ---------- Deployment ------------
// __dirname = path.resolve();

const gg = path.join(__dirname, "../");
// console.log(gg);
// console.log(path.join(gg, "app/frontend", "build", "index.html"));
// console.log(path.join(gg, "app/frontend/build"));
if (serverstate === "Production") {
  app.use(express.static(path.join(gg, "template_react", "build")));
  // app.use(express.static(path.join(gg, "frontend/build")));

  app.get("/*", (req, res) => {
    // console.log(
    //   res.sendFile(path.join(gg, "app/frontend", "build", "index.html"))
    // );

    return res.sendFile(path.join(gg, "template_react", "build", "index.html"));
    //  return res.sendFile(
    //    path.resolve(gg, "frontend", "build", "index.html")
    //  );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// app.use(notFound);
// app.use(errorHandler);

app.listen(port, () => {
  console.log("Server Listening at port 5000");
});
