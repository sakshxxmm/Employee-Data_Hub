const User = require("../models/User")

exports.deleteUser = async (req,res) => {
    try{
      const userId = req.body._id
      console.log('req.body=>', req.body._id)

      const user = await User.findById(userId)
      if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found",
        })
      }
    
      await User.findByIdAndDelete(userId)

      return res.status(200).json({
        success:true,
        message:"User deleted successfully"
      })

    }catch(error){
       console.log("Error Occured->",error)
       return res.status(500).json({
        success:false,
        message:"Something went wrong"
       })
    }
}