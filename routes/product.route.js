const express=require('express')
const productRoute=express.Router()
const {createProduct,deleteProduct,findAllProduct,findByIdProduct,updateProduct}=require("../controller/product.controller")
 const authGuard=require("../middleware/auth.guard")
 const roleGuard = require('../middleware/role.guard')
 

// productRoute.use(authGuard)
productRoute.post("/",authGuard,createProduct)
productRoute.get("/",findAllProduct)
productRoute.get("/:id",findByIdProduct)
productRoute.patch("/:id",updateProduct)
productRoute.delete("/:id",deleteProduct)


module.exports=productRoute

//roleGuard('moderator')

// productRoute.post("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   productRoute.get("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   productRoute.patch("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   productRoute.delete("/", (req, res) => {
//     res.send({ url: req.originalUrl, method: req.method });
//   });
//   module.exports=productRoute

//body ishlatish
//  productRoute.post("/", (req, res) => {
//    console.log("product post handler works")
//      const body=req.body
//    console.log("request body is:",body);
//    res.send(body);
//  });
// //query ishlatish 
// //productRoute.get("/", (req, res) => {
// //  const query=req.query
// //  res.json(query) 
// //})
// productRoute.get("/create", (req, res) => {
//   const params=req.params
//    res.json("create route ishladi")
// })
// productRoute.get("/:id", (req, res) => {
//   const params=req.params
//   // res.end(query)
//    res.json(params)
// })
// productRoute.patch("/:id", (req, res) => {
//   const params=req.params
//   const body=req.body
//   const obj={params,body}
//   res.send(obj);
// });
// productRoute.delete("/:id", (req, res) => {
//   res.send({ url: req.originalUrl, method: req.method });
// });
