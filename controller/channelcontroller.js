const Channel=require('./../models/channelmodel.js')

var ObjectId = require('mongodb').ObjectID;
exports.createchannel=async(req,res)=>{
    try{
        console.log(req.body)
        const newchannel=await Channel.create(req.body);

        res.status(201).json({
            status:'success',
            data:{
                newchannel
            }
        });
    }catch{
        res.status(400).json({
            status:'fail',
            message:err
        })
    }
}



exports.updatechannel=async(req,res)=>{
    try{
        var id = (req.params.id).trim();
        console.log(req.body);
        const channels=await Channel.findByIdAndUpdate({_id: id},req.body,{
            new:true
    });
    res.status(200).json({
        status:'success',
        results:channels.length,
        data:{
            channels
        }
    });
    }catch(err){
        res.status(400).json({
            status:'fail',
            err
        });
    }
}

exports.getchannel=async(req,res)=>{
    const channels=await Channel.find();
    try{
        res.status(200).json({
            status:'success',
            results:Channel.length,
            data:{
                channels
            }
        });
    }catch(err){
        res.status(404).json({
            status:'fail',
            err
        });
    }
}


exports.getspecificchannel = async (req, res) => {
    // const id = req.params.id;
    var id = (req.params.id).trim();
    const channels = await Channel.findOne({_id: id});
    try {
      res.status(200).json({
        status: 'success',
        results: channels.length,
        data: {
          channels
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        err
      });
    }
  };