const express=require('express')
const addressesRoute=express.Router()
const {createAddresses,deleteAddresses,findAllAddresses,findByIdAddresses,updateAddresses}=require("../controller/addresses.controller")
 const authGuard=require("../middleware/auth.guard")
 const roleGuard = require('../middleware/role.guard')
 

addressesRoute.post("/",roleGuard,authGuard,createAddresses)
addressesRoute.get("/",findAllAddresses)
addressesRoute.get("/:id",findByIdAddresses)
addressesRoute.patch("/:id",updateAddresses)
addressesRoute.delete("/:id",deleteAddresses)


module.exports=addressesRoute