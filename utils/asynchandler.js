//const asynchandler = () =>{}
const asynchandler = (func) =>{async(req,res,next)=>{
    try {

        await func(req,res,next)
        

    } catch (error) {
        res.status(err.code).json({
            success:false,
            message:err.message
        })
    }
}}

export {asynchandler}