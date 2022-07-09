const mongoose =require('mongoose')


const channelSchema=new mongoose.Schema({
   
    channelid:{
        type: String
    },
    channeladmin:{
        type: String
    },
    channelmoderator: [String]

})


const Channel=mongoose.model('Channel',channelSchema)

module.exports=Channel;