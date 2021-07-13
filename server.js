const express = require("express");
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose')
const User= require('./model/user')
const bcrypt= require('bcryptjs')
const dotenv= require('dotenv')
const jwt = require('jsonwebtoken')
const JWT_SECRET= 'hsdfjkahsjkbewgiuenkejuiehkjjwenjkqwb67739320962984849072*@*^$*^$'
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    }).then (() => {
        console.log(`Connection Successful`);    
    }).catch((e) => {
        console.log(`No Connection`);
    
})

app.use('/public', express.static('public'));
app.use('/', express.static(path.join(__dirname, 'static')))
app.use(express.json());
app.post('/api/login', async (req,res)=>{
 const{username, password}= req.body
 const user= await User.findOne({username}).lean()

 if(!user){
     return res.json({
         status:'error' , error: 'Invalid Username/Password'
     })
 }

if(await bcrypt.compare(password, user.password)){

    const token= jwt.sign({ id:user._id,
         username:user.username },
        JWT_SECRET
        )

   return res.json({ status:'OK', data: token})
    
}
    res.json({ status:'error', error: 'Invalid Username/Password'})
})


app.post('/api/register', async (req,res)=>{
    console.log(req.body)
    const {username, email, password: plainTextPassword} =req.body
    
    if(!username || typeof username !== 'string'){
        return res.json({status:'error', error: 'Invalid Username'})
    }
    
    if(!plainTextPassword || typeof plainTextPassword !== 'string'){
        return res.json({status:'error', error: 'Invalid Password'})
    }
    const password = await bcrypt.hash(plainTextPassword, 10)
    
    try{
     const response=await User.create({
         username,
         email,
         password
     })
     console.log('Signup Successful',response)
    }catch(error){
      if(error.code===11000){
          return res.json({ status: 'error', error: 'User already exists'})
      }
      throw error
    }
    
    res.json({status:'OK'})
})
app.listen(port, () => {
    console.log(`Server is running ${port}` );
})