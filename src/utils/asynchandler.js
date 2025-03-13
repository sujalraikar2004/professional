const asynchandler=(fun)=>{
    async (req,res,next)=>{
        try {
            await fun(req,res,next)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
    }
}
export {asynchandler}