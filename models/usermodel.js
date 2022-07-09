const mongoose=require('mongoose');



const UserSchema=new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    userid:{
        type:String
    },
    phonenumber:{
        type:String
    },
    hashedpassword:{
        type:String
    },
    token:{
        type:String
    }


    

})


const User=mongoose.model('User',UserSchema);
module.exports =User;