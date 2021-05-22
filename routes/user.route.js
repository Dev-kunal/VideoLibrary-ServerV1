const express=require("express");
const router=express.Router();
const User=require("../models/user.model.js");


router.route("/")
.post(async (req,res)=>{
  try{
  const user=req.body;
  const NewUser= new User(user);
  const savedUser=await NewUser.save();
  res.json({success:true,user:savedUser})
  }
  catch(err){
    res.json({success:false,message:err.message})
  }
  
})
router.route("/login")
.post(async (req,res)=>{
  try{
  let {username,password}=req.body
  const result=await User.findOne({username:username});
  if(result.password===password){
    res.status(200).json({success:true,user:result})
  }
  else{
    res.json({success:false,message:"Either youre not registered with us or you entered wrong password "})
  }
  }
  catch(err){
  res.status(500).json({ success: false, message: "unable to get user", errorMessage: err.message })
  }
})
  
module.exports=router