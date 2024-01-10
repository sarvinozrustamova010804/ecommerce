const express=require('express')
const {creatCategory,findAllCategory,findCategoryById,updateCategory,deleteCategory}=require("../controller/category.controller")
const categoryRoute = express.Router()
 categoryRoute.post("/", creatCategory)
 categoryRoute.get("/", findAllCategory )
 categoryRoute.get("/:id", findCategoryById )
 categoryRoute.patch("/:id",updateCategory)
 categoryRoute.delete("/:id", deleteCategory)

  module.exports=categoryRoute

 // const categoryRoute=express.Router()

  // categoryRoute.get("/create ",( req,res) => {
   // const params=req.params
  //    res.json("create route ishladi")
  // })
  // categoryRoute.get("/:id", (req, res) => {
  //   const params=req.params
  //    res.json(params)
  // })
  // categoryRoute.patch("/:id", (req, res) => {
  //   const params=req.params
  //   const body=req.body
  //   const obj={params,body}
  //   res.send(obj);
  // });
  // categoryRoute.delete("/:id", (req, res) => {
  //   res.send({ url: req.originalUrl, method: req.method });
  // });
 



  // categoryRoute.post("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   categoryRoute.get("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   categoryRoute.patch("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   categoryRoute.delete("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });

