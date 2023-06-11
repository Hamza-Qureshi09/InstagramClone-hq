class ErrorHandler extends Error{
    constructor(message,status){
        super(message) //constructor of error class
        this.status=status

        Error.captureStackTrace(this,this.constructor)
    }
}

module.exports=ErrorHandler 