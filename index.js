const express = require("express");
const app = express();
const env = require("./config/env.config.js");
const productRoute= require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js')
const authRoute=require("./routes/auth.route.js");
const categoryRoute = require("./routes/category.route.js");

app.use(express.json()) //body ishlatish
app.use('/product',productRoute) 
app.use('/categories',categoryRoute) 
app.use('/user',userRoute)
app.use('/auth',authRoute)
app.get('/',(req,res)=>{
    res.send({url:originalUrl,method:req.method})
})
// const port=process.env.PORT
//app.listen(3003,()=>console.log('Server is listening on port 3003'))
const port = env.PORT;
app.listen(port, () => console.log(`Server is listening on port  ${port}`));
