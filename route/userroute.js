const express = require('express');
const router=express.Router();
// const { router } = require('../app');

const Authcontroller = require('../controller/Authcontroller.js');
const { signup, login, streamRegister,updateuser } = require('../controller/Authcontroller');
const {createchannel,updatechannel,getchannel,getspecificchannel}=require('./../controller/channelcontroller.js');

router.route('/signup').post(streamRegister); //added by Uma
router.route('/login').post(login); //added by Uma
// router.route('/updatechannel').post(updatechannel);
router.route('/createchannel').post(createchannel);
router.route('/updatechannel/:id').patch(updatechannel);
router.route('/getchannel').get(getchannel);

router.route('/findchannel/:id').get(getspecificchannel);




//router.post('/login', login);

module.exports=router;  