import cors from 'cors';
import express from 'express';
import { connectToDB } from "./db.js";
import { db } from './db.js';


const app = express();
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.json("server is running successfully!");
})
app.post('/ast', (req, res) => {
    console.log({Name:req.body.name,AST:req.body.team})
    res.json({Name:req.body.name,AST:req.body.team});
})

app.post('/logi', async(req, res) => {
    await db.collection("ast").insertMany(req.body)
    
    // console.log({email:req.body.email,password:req.body.passwor})
    // res.json({eamil:req.body.email,password:req.body.password});
    
    .then((result)=>{
        res.json(result)
    })
    .catch((e)=>console.log(e))
})
app.post('/signin', async (req, res) => {
    try {
        const result = await db.collection("ast").findOne({ email: req.body.email });
        if (result.password == req.body.password) {
            res.json({ message: "sign in success"});
        } else {
            res.json({ error: "user not found" });
        }
    } catch (e) {
        console.error(e);  // Log the error
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post('/signin', async (req, res) => {
    try {
        const result = await db.collection("ast").findOne({ email: req.body.email });
        if (result.password == req.body.password) {
            res.json({ message: "sign in success"});
        } else {
            res.json({ error: "user not found" });
        }
    } catch (e) {
        console.error(e);  // Log the error
        res.status(500).json({ error: "Internal server error" });
    }
});
app.post('/signin', async (req, res) => {
    try {
        const result = await db.collection("ast").findOne({ email: req.body.email });
        if (result.password == req.body.password) {
            res.json({ message: "sign in success"});
        } else {
            res.json({ error: "user not found" });
        }
    } catch (e) {
        console.error(e);  // Log the error
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/signup')
app.post('/signup', async (req, res) => {
    const data=await db.collection("ast").insertone({email:req.body.email,password:req.body.password})
    try {

        const { email, password } = req.body;
        
        // Check if the user already exists
        const existingUser = await db.collection("ast").findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser = { email, password: hashedPassword };
        await db.collection("ast").insertOne(newUser);

        res.status(201).json({ message: "User created successfully" });
    } catch (e) {
        console.error(e);  // Log the error
        res.status(500).json({ error: "Internal server error" });
    }
});




const handleLogin=async(req,res)=>{
    const user= await db.collection("ast").findOne({ email:req.body.email});
    console.log(user)
    if( user && user.password === req.body.password){
        res.json("success");
    }
    else{
        res.json("failure login");
    }
}
app.post('/login1',handleLogin);
const handlesignin=async(req,res)=>{
    const user= await db.collection("ast").findone({})
}
// app.post('/signup', async (req, res) => {
//     try {
//         const { Email, FirstName, LastName, Password } = req.body;

//         const result = await db.collection('ast').insertOne({
//             Email,
//             FirstName,
//             LastName,
//             Passworda
//         });

//         console.log(result);
//         res.json({ success: true, message: 'Signup successful', values: result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'An error occurred during signup' });
//     }
// });




    

connectToDB(() => {
    app.listen(9000, () => {
        console.log("server running at 9000");
    })
})