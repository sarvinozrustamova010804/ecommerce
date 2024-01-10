const express=require('express')
const attributesRoute=express.Router()
const {createAttributes,deleteAttributes,findAllAttributes,findByIdAttributes,updateAttributes}=require("../controller/attributes.controller")
 const authGuard=require("../middleware/auth.guard")
 const roleGuard = require('../middleware/role.guard')
 

arrtibutesRoute.post("/",roleGuard,authGuard,createAttributes)
arrtibutesRoute.get("/",findAllAttributes)
arrtibutesRoute.get("/:id",findByIdAttributes)
arrtibutesRoute.patch("/:id",updateAttributes)
arrtibutesRoute.delete("/:id",deleteAttributes)


module.exports=arrtibutesRoute