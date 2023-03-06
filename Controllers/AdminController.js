const adminmodel = require("../Models/AdminModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");

const AdminRegisterController = asyncHandler(async (req, res) => {
  console.log("Req accepted at admin");
  const { name, emailid, password } = req.body;
  console.log(req.body);
  const userfound = await adminmodel.findOne({ emailid });
  console.log(userfound);
  if (userfound) {
    res.status(400);
    throw new Error("Admin ALREADY EXIST");
  }
  console.log("ggwp");
  const usercreate = await adminmodel.create({
    name,
    emailid,
    password,
  });

  if (usercreate) {
    res.json({
      _id: usercreate._id,
      name: usercreate.name,
      emailid: usercreate.emailid,
      password: usercreate.password,

      token: generateToken(usercreate._id),
    });
  }
  else {
    console.log("Not created")
  }
});

const AdminLoginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const adminfound = await adminmodel.findOne({ email,password });
  console.log(adminfound);
  if (adminfound) {
    console.log("Sending response");
    res.json({
      _id: adminfound._id,
      name: adminfound.name,
      email: adminfound.emailid,
      password: adminfound.password,

      token: generateToken(adminfound._id),
    });
    console.log("Response sent")
  } else {
    throw new Error("Invalid Email or Password");
  }
});

const AdminOneAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const admin = await adminmodel.findById(id);
  console.log(admin);
  if (admin) {
    res.json(admin);
  } else {
    res.status(400);
    throw new Error("No admin Available");
  }
});

const AdminUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted of admin update");
  const { name, emailid, password } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const admin = await adminmodel.findById( id );
  console.log(admin);
  if (admin) {
    admin.name = name;
    admin.emailid = emailid;
    admin.password = password;

    const updatedadmin = await admin.save();
    res.json(updatedadmin);
  } else {
    res.status(400);
    throw new Error("Error Occured. Admin Not Update");
  }
});

const AdminDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const admin = await adminmodel.findById(id );
  console.log(admin);
  if (admin) {
    await admin.remove();
    res.json({ message: "Admin has been removed" });
  }
  else {
    throw new Error('Error Occured. Admin Not Deleted')
  }
});


const AdminAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const admin = await adminmodel.find();
  console.log(admin);
  if (admin) {
    res.json(admin);
  } else {
    res.status(400);
    throw new Error("Error Occured. Admin Not Found");
  }
});

module.exports = {
  AdminRegisterController,
  AdminDeleteController,
  AdminUpdateController,
  AdminLoginController,
  AdminAllController,
  AdminOneAdmin,
};
