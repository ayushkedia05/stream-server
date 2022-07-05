const express = require('express');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000; //added by Uma
const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DATABASE;


mongoose
  .connect(DB, {
    useNewUrlParser: true,

    useUnifiedTopology: true
  })
  .then(con => {
    // console.log(con.connection);
    console.log('DB connection successful');
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.post('/', (req, res) => {
    res.send('Hello, World!'); //added by Uma
});

app.post("/signup", require("./route/userroute"));
app.post("/login", require("./route/userroute")); //added by Uma
app.post("/createchannel", require("./route/userroute"));
app.patch("/updatechannel/:id",require("./route/userroute"));
app.get("/getchannel",require("./route/userroute"));
app.get("/findchannel/:id",require("./route/userroute"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;