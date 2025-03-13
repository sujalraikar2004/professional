class ApiError extends Error{
    constructor(
        statusCode,
        message='somethong went wrog',
        error=[],
        statck=""
    ){
        super(message)
        this.statusCode=statusCode
        this.error=error
        this.statck=statck
        this.success=false
        this.message=message
        if (statck){
            this.statck=statck

        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}

export {ApiError}