const express = require("express");
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/',(req,res,next)=>{
    res.send('working');
})

module.exports = router;