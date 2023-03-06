const userModel = require("../Models/UserModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");

const userRegisterController = asyncHandler(async (req, res) => {
  console.log('Req accepted')
  const { name, email, password } = req.body;
  console.log(req.body)
  const userfound = await userModel.findOne({ email });
  if (userfound) {
    res.status(400);
    throw new Error("USER ALREADY EXIST");
  }
  console.log('ggwp')
  const usercreate = await userModel.create({
    name,
    email,
    password
    
  });

  if (usercreate) {
    res.json({
      _id: usercreate._id,
      name: usercreate.name,
      email: usercreate.email,
      token:generateToken(usercreate._id)
    });
  }
});




const userLoginController = asyncHandler(async (req, res) => {
 
  const { email, password } = req.body;

  const userfound = await userModel.findOne({ email,password });
  console.log(userfound)
  if (userfound) {
    console.log('Sending response')
    res.json({
      _id: userfound._id,
      name: userfound.name,
      email: userfound.email,
      
      token: generateToken(userfound._id),
    });
  } else {
    
    throw new Error('Invalid Email or Password')
  }
});




const userAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const user = await userModel.find();
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});

const userOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const user = await userModel.findById(id);
  console.log(user);
  if (user) {
    res.json(user);
  } else {
    res.status(400);
    throw new Error("No Users Available");
  }
});



const userDeleteController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const id = req.params.id;
  console.log(req.body);
  const user = await userModel.findById( id );
  console.log(user);
  if (user) {
    await user.remove();
    res.json({ message: "User has been removed" });
  }
  else {
    throw new Error("Error Occured. User Not deleted");
  }
});


const userUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, email, password } = req.body;
  const id = req.params.id;
  console.log(req.body);
  const user = await userModel.findById( id );
  console.log(user);
  if (user) {
    user.name = name;
   
    user.email = email;
    user.password = password;

    const updateduser = await user.save();
    res.json(updateduser);
  } else {
    res.status(400);
    throw new Error("Update Not Done");
  }
});

module.exports = {
  userRegisterController,
  userLoginController,
  userAllController,
  userUpdateController,
  userDeleteController,
  userOneController,
};
