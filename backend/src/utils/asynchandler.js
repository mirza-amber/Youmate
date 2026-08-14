/* https://chatgpt.com/share/6a7eb9cd-2410-83ee-a0c0-4e919d27d722  - Gpt link for explanation 


const asynchandler = (func)=>{ ()=>{} }
Method 1
*/
const asynchandler = (func)=> async (req, res, next)=>{
    try{
        await func();
    }
    catch(error){
        res.send(error.code || 500).json(
            {
                success : false,
                message : error.message
            }
        )
    }
} 

/*
Method 2 
const asynchandler = (requesthandler)=>{
    Promise.resolve(requesthandler(req, res, next)).catch((err)=> nextg(err))
}
*/