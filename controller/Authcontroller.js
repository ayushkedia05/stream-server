const { connect,upsertUser } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
const User=require('./../models/usermodel.js');
const Channel=require('./../models/channelmodel.js')

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var stream = require("getstream"); //added by Uma

/*

Couple of things:
1. You need to save users, so remember to create a models folder with all user/data schema in it. 
2. After registering create a user object as pass all data to save user. 
3. in the .env file, for getstream, don't add " " or ' '; when storing keys. 
4. I've only hardcoded the data below, but yours is the right approach of using process.env.XYZ

*/

/*
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;
*/

client = stream.connect( //added by Uma
    "rc6s6y5c9g5g",
    "gr27rkkfxnxawmt3dmwyvqg3yhm97phfu5aq89eegnh9u5veaptfcgc77ujunx9b",
    "1193405"
    
  );
  // Instantiate a new client (client side)
   client = stream.connect("rc6s6y5c9g5g", null, "1193405"); //added by Uma

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        // const serverClient = connect(api_key, api_secret, app_id);
        const serverClient = connect( api_key, api_secret,app_id);
       // const client = StreamChat.getInstance(api_key, api_secret);


        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createToken(userId);
         
        console.log(token,userId);

        // name: cookies.get('username'),
        // fullName: cookies.get('fullName'),
        // image: cookies.get('avatarURL'),
        // hashedPassword: cookies.get('hashedPassword'),
        // phoneNumber: cookies.get('phoneNumber'),

        const updateResponse = await serverClient.upsertUser({ 
          id: userId, 
          role: 'admin', 
          name:username,
          fullName:fullName,
          hashedPassword:hashedPassword,
       });

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);

        res.status(400).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(
      
          "rc6s6y5c9g5g",
          "gr27rkkfxnxawmt3dmwyvqg3yhm97phfu5aq89eegnh9u5veaptfcgc77ujunx9b",
          "1193405" 
          
        );

        const client = StreamChat.getInstance("rc6s6y5c9g5g", "gr27rkkfxnxawmt3dmwyvqg3yhm97phfu5aq89eegnh9u5veaptfcgc77ujunx9b");
    

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: 'User not found' });

        // const success = await bcrypt.compare(password, users[0].hashedPassword);
  const success=true;
        const token = serverClient.createUserToken(users[0].id);

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

//

const streamRegister = async (req, res) => { //added by Uma
    try {
      const {fullName, username, password, phoneNumber } = req.body;
  
      const userId = crypto.randomBytes(16).toString("hex");
  
      const serverClient = connect(
      
        "rc6s6y5c9g5g",
        "gr27rkkfxnxawmt3dmwyvqg3yhm97phfu5aq89eegnh9u5veaptfcgc77ujunx9b",
        "1193405" 
        
      );
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const token = serverClient.createUserToken(userId);
data={
  
  name:fullName,
  username:username,
  userid: userId,
  phonenumber:phoneNumber, 
      hashedpassword:hashedPassword,
      token:token
}
 const newuser=await User.create(data);


      res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber  });
    } catch (error) {
      console.log(error);
  
      res.status(500).json({ message: error });
    }
  };



const updateuser = async (req, res) => { //added by Uma
  try {
    const {userId} = req.body;

    // const userId = crypto.randomBytes(16).toString("hex");

    const serverClient = connect(
    
      "rc6s6y5c9g5g",
      "gr27rkkfxnxawmt3dmwyvqg3yhm97phfu5aq89eegnh9u5veaptfcgc77ujunx9b",
      "1193405" 
      
    );

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const token = serverClient.createUserToken(userId);

  //   const updateResponse = await serverClient.upsertUser({ 
  //     id: userId, 
  //     role: 'admin', 
  //  });


    //console.log(token, name, userId, hashedPassword, email)
    res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber  });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login, streamRegister,updateuser}