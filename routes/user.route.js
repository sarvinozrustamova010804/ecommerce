const express = require (`express`);
const {creatUser, findAllUser,getByIdUser,updateUser,deleteUser}=require("../controller/user.controller.js");

const userRoute=express.Router();
 
userRoute.post("/",creatUser);
userRoute.get("/",findAllUser);
userRoute.get("/:id",getByIdUser);
userRoute.patch("/:id",updateUser);
userRoute.delete("/:id",deleteUser);

module.exports = userRoute;