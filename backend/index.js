// const port = 4000;

// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');
// const cors = require('cors');

// // middleware
// app.use(express.json());
// app.use(cors());

// // database connection
// mongoose
//   .connect(
//     "mongodb+srv://greatstack:abd123gha456@cluster0.abrud7r.mongodb.net/ecommerce?retryWrites=true&w=majority"
//   )
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch(err => console.error("MongoDB connection error:", err));

// // test route
// app.get('/', (req, res) => {
//   res.send("hello from backend express app is running");
// });

// // image storage engine
// const storage = multer.diskStorage({
//   destination: './uploads/images',
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   }
// });

// const upload = multer({ storage });

// // serve uploaded images
// app.use('/images', express.static( 'uploads/images'));

// // upload endpoint
// app.post('/upload', upload.single('product'), (req, res) => {
//   if (!req.file) {
//     return res
//       .status(400)
//       .json({ success: 0, message: 'No file uploaded' });
//   }

//   res.json({
//     success: 1,
//     image_url: `http://localhost:${port}/images/${req.file.filename}`
//   });
// });


// // Schema for creating products
// const Product = mongoose.model('Product', {
//     id: {
//         type: Number,
//         required: true,
//     },
//     name: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     new_price: {
//         type: Number,
//         required: true,
//     },
//     old_price: {
//         type: Number,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     available: {
//         type: Boolean,
//         default: true,
//     }
// });


// // Add product endpoint
// app.post('/addproduct', async (req, res) => {
//     let products= await Product.find({})
//     let id;
//     if(products.length>0){
//       let lastProductaarray=products.slice(-1)
//       let lastproduct=lastProductaarray[0];
//       id=lastproduct.id+1;

      
//     }
//     else{
//       id=1
//     }


//     const product = new Product({
//         id: id,
//         name: req.body.name,
//         image: req.body.image,
//         category: req.body.category,
//         new_price: req.body.new_price,
//         old_price: req.body.old_price,
//     });

//     console.log(product);

//     await product.save()
        

//     console.log("product added");

//     res.json({
//         success: true,
//         message: "Product added successfully",
//     });
// });

// app.post('/deleteproduct', async (req, res) => {
//   await Product.findOneAndDelete({id:req.body.id});
//   console.log("product deleted");
//   res.json({
//       success: true,
//       name: req.body.name,
//   });
// });

// app.get('/allproducts', async (req, res) => { 
//   let products= await Product.find({});
//   console.log("all products fetched");
//   res.send(products);

// });

// //schema for users
// const Users=mongoose.model('Users',{
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{ 
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
//     cartData:{    
//         type:Object,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     } 

// });



// // Creating endpoint for user registration
// app.post('/signup', async (req, res) => {
//     let check = await Users.findOne({ email: req.body.email });

//     if (check) {
//         return res.status(400).json({
//             success: false,
//             errors: "User with this email already exists"
//         });
//     }

//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//         cart[i] = 0;
//     }

//     const user = new Users({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         cartData: cart,
//     });

//     await user.save();

//     const data = {
//         user: {
//             id: user.id,
//         }
//     };

//     const authToken = jwt.sign(data, 'secret_ecom');

//     res.json({
//         success: true,
//         authToken: authToken
//     });
// });




// // Creating endpoint for user login
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 errors: "All fields are required"
//             });
//         }

//         const user = await Users.findOne({ email, password });

//         if (!user) {
//             return res.status(400).json({
//                 success: false,
//                 errors: "Invalid credentials"
//             });
//         }

//         const data = {
//             user: {
//                 id: user.id
//             }
//         };

//         const authToken = jwt.sign(data, "secret_ecom");

//         return res.json({
//             success: true,
//             authToken
//         });

//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// });


// app.get('/newcollections',async (req,res)=>{
//     let products= await Product.find({})
//     let newcollection=products.slice(1).slice(-8);
//     console.log("Newcollection  Fetched")
//     res.send(newcollection)
// })

// app.get('/popularinwomen',async (req,res)=>{
//     let products= await Product.find({category:'Women'})
//     let popular_in_women=products.slice(0,4);
//     console.log("popular in men   Fetched")
//     res.send(popular_in_women)
// })

// //creating middleware to fetch user
// const fetchUser=async(req,res,next)=>{
//     const token =req.header('authtoken');
//     if(!token){
//         res.status(401).send({errors:"plz authenticate using valid tokken"})
//     }
//     else
//     {
//         try {
//             const data=jwt.verify(token,'secret_ecom');
//             req.user=data.user;
//             next();
//         } catch (error) {
//                     res.status(401).send({errors:"plz authenticate using valid tokken"})

            
//         }
//     }
// }


// app.post('/addtocart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });
//     const itemId = Number(req.body.itemId);
//     userData.cartData[itemId] += 1;
//     await Users.findOneAndUpdate(
//       { _id: req.user.id },
//       { cartData: userData.cartData }
//     );
//     res.json({ success: true });
// });


// app.post('/removefromcart', fetchUser, async (req, res) => {
//     let userData = await Users.findOne({ _id: req.user.id });

//     const itemId = Number(req.body.itemId);
//     console.log("Remove request for item:", itemId); // debug

//     if (userData.cartData[itemId] !== undefined && userData.cartData[itemId] > 0) {
//         userData.cartData[itemId] -= 1;
//     }

//     await Users.findOneAndUpdate(
//         { _id: req.user.id },
//         { cartData: userData.cartData }
//     );

//     res.json({ success: true, cart: userData.cartData[itemId] });
// });

// app.post('/getcart',fetchUser,async (req,res)=>{
//     console.log("GetCart")
//     let userData= await Users.findOne({_id:req.user.id})
//     res.json(userData.cartData)
// })



// // start server
// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = 4000;

connectDB();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("uploads/images"));
app.use("/", require("./routes/uploadRoutes"));


app.use("/", require("./routes/productRoutes"));
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/cartRoutes"));

app.listen(port, () => {
  console.log("Server running on port " + port);
});
