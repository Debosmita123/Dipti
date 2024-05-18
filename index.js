
//Student id: 000521601
// Student Name : Dipti Rani Sarkar

// Import required module
const express = require("express");
const mongoose = require("mongoose");

//calling express into app variable and setting mongoose strictQuery to true
const app = express();
mongoose.set("strictQuery", true);

// Set up MongoDB connection
const username="new_student";
const password="password_123";
const dbname="sample_supplies";
const URI= `mongodb+srv://${username}:${password}@cluster0.xpiu99c.mongodb.net/${dbname}?retryWrites=true&w=majority`

//connecting mongoose with the URI
mongoose
  .connect(URI)
  .then(() => {
    console.log("Connected to mongodb succesfully");
  })
  .catch((err) => console.error(err));

  //creating schema for mongoose
  const salesSchema = new mongoose.Schema({
    saleDate: { type: Date, default: Date.now },
  items: [{
    name: { type: String, required: true },
    tags: [{ type: String, required: true }],
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }],
  storeLocation: { type: String, required: true },
  customer: [{
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    satisfaction: { type: Number, required: true },
  }],
  couponUsed: { type: Boolean, required: true },
  purchaseMethod: { type: String, required: true },
    
  });

  //creating a mongoose model
  const Sale = mongoose.model('Sale', salesSchema);

  //telling the app to use express.json()
  app.use(express.json());

 //setting base URL
app.get("/", function (req, res) {
    res.send("This is the index page.");
  });

  //Retrieve all sales
  //GET ALL ROUTE
  app.get('/sale', (req, res)=>{
    Sale.find().then((sales)=>{
        if(!sales.length){
            return res.status(404).json({success:false,data:"No data found."});
        }
        return res.status(200).json({success:true,data:sales});
     }).catch((err)=>{
         return res.status(400).json({success:false,error:err});
     });
   });

//Retrieve a specific sale by ID
//GET BY ID ROUTE
app.get('/sale/:id',(req,res)=>{
  Sale.findById(req.params.id).then((saleData)=>{
      return res.status(200).json({success:true,data:saleData});
  }).catch((err)=>{
      return res.status(400).json({success:false,error:err});
  });
});

// Set the port for the server to listen on
app.listen("3000", function (req, res) {
    console.log("server running...");
  });