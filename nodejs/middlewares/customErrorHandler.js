const errorHandler=require("../utils/errorHandler")

module.exports=(err,req,res,next)=>{
    
    err.status=err.status || 500;
    err.message=err.message || 'Internal server error'

    // wrong mongodb id error 
    if(err.name==='CaseError'){
        const message=`Resource not found, Invalid ${err.path}`
        err=new errorHandler(message,400)
    }

    res.status(err.status).json({
        success:false,
        message:err.message
    })
}