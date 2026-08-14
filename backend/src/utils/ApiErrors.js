/* https://chatgpt.com/share/6a7ecbaf-a7e4-83e8-b8a4-dd71797328cc - GPT explanation of this class*/ 

class ApiError extends Error{
    constructor(statuscode, message="Something wrong", errors= [], statck = ""){
        super(message);
        this.statuscode = statuscode;
        this.data = null;
        this.message = message; // This line may be redundant because we already did super(message)
        this.success = false;
        this.errors = errors

        if(statck){
            this.stack= statck
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}