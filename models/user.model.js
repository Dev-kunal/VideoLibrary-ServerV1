const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({
  username:{
    type:String,
    unique:[true,"This Username is already taken please select another username"]
  },
  password:{
  type:String,
  required:"Password is Required"
    }
},{
  timestamps:true
})

const User=mongoose.model("User",UserSchema);

module.exports=User;