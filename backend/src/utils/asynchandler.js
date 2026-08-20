/* https://chatgpt.com/share/6a7eb9cd-2410-83ee-a0c0-4e919d27d722  - Gpt link for explanation 


const asynchandler = (func)=>{ ()=>{} }
Method 1
*/
const asyncHandler = (func)=> async (req, res, next)=>{
    try{
        await func(req, res, next);
    }
    catch(error){
        console.log("ACTUAL ERROR:", error);
        console.log("STACK:", error.stack);
        res.status(error.statuscode || 500).json(
            {
                success : false,
                message : error.message
            }
        )
    }
} 

export {asyncHandler}

/*
Method 2  
const asynchandler = (requesthandler)=>{
    Promise.resolve(requesthandler(req, res, next)).catch((err)=> nextg(err))
} 
*/