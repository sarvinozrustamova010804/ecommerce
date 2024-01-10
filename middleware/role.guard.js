
//module.exports=function roleGuard
function roleGuard(...roles) {
return function(req,res, next) {
    if (roles.includes(req.role)){
        next()
        return
    }
    res.status(403).json({massege:`You have no right to${req.method}to ${req.originalUrl}`})
}
}
module.exports = roleGuard;
