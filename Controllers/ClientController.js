const clientModel = require("../Models/ClientModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../util/generateToken");

const clientRegisterController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
  const { name, contactperson, emailid, mobileno } = req.body;
  console.log(req.body);
    const userfound = await clientModel.findOne({ emailid });
    console.log(userfound);
  if (userfound) {
    res.status(400);
    throw new Error("Client ALREADY EXIST");
  }
  console.log("ggwp");
  const usercreate = await clientModel.create({
    name,
    contactperson,
    emailid,
    mobileno,
  });

  if (usercreate) {
    res.json({
      _id: usercreate._id,
      name: usercreate.name,
      contact_person: usercreate.contactperson,
      email_id: usercreate.emailid,
      mobile_no: usercreate.mobileno,

      token: generateToken(usercreate._id),
    });
  }
});



const clientUpdateController = asyncHandler(async (req, res) => {
  console.log("Req accepted");
    const { name, contactperson, emailid, mobileno } = req.body;
    const id = req.params.id;
  console.log(req.body);
  const client = await clientModel.findById( id );
  console.log(client);
    if (client) {
        client.name = name;
        client.contactperson = contactperson
        client.emailid = emailid
        client.mobileno = mobileno
        
        const updatedclient = await client.save()
        res.json(updatedclient)
        
    
    }
    else {
        res.status(400)
        res.json({message:"Client Not found"})
    }
  
});

const clientAllController = asyncHandler(async (req, res) => {
  console.log("Get Req accepted");
  const client = await clientModel.find();
  console.log(client);
  if (client) {
    res.json(client);
  } else {
    res.status(400);
    res.json({ message: "No Clients Available" });
  }
});

const clientOneController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("Get Req accepted");
  const client = await clientModel.findById(id);
  console.log(client);
  if (client) {
    res.json(client);
  } else {
    res.status(400);
    throw new Error("No Client Available");
  }
});


const clientDeleteController = asyncHandler(async (req, res) => {
    console.log("Req accepted");
    const id = req.params.id;
    console.log(req.body);
    const client = await clientModel.findById( id );
    console.log(client);
    if (client) {
        await client.remove();
        res.json({ message: "Client has been removed" })
    }
  

  
}
);



module.exports = {
  clientRegisterController,
  clientDeleteController,
  clientUpdateController,
  clientAllController,
  clientOneController,
};
