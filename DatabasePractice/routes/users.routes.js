const express = require('express');
const router = express.Router();
let user = require("../models/users.models");

router.get('/all', (req, res)=>{
    user.getAll(req, res);
})

router.post('/login', (req, res)=>{
    user.login(req, res);
})

router.post('/signup', (req, res)=>{
    user.create(req, res);
})

module.exports = router;