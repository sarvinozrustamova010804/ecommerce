const jwt= require ('jsonwebtoken')
const env = require('../config/env.config')
const { response } = require('express')

function authGuard(req,res,next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]
   const payload =jwt.verify(token,env.ACCESS_TOKEN_SECRET)
   req.id=payload.id
   req.role=payload.role
   next()
  } catch (error) { 
    console.error(error.message);
    res.status(error.status || 500)
    res.json({ error: "Auth guard error: " + error.message });
  }}
   
module.exports=authGuard