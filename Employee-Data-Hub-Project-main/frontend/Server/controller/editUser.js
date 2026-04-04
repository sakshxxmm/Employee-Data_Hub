const User = require("../models/User")

exports.editUser = async (req,res) => {
   try{
    console.log("req.body=>",req.body)
    const {userId} = req.body
    console.log('req.body._id=>', userId)
    const updates = req.body
    const user = await User.findById(userId)
    if(!user){
     return res.status(404).json({
         success:false,
         message:"User Not Found"
     })
    }
    //updates only the field that are present in the req body
    for(const key in updates){
        if(updates.hasOwnProperty(key)){
        if(key==="name"){
            user[key] = updates[key]
            // console.log("userimage=>",user.image)
            user.image=`https://api.dicebear.com/5.x/initials/svg?seed=${updates[key]}`
            // console.log("userimageupdated=>",user.image)
        }
        // else if(key ==="image"){
        //     continue
        // }
        else{ 
            user[key] = updates[key]
        }
        }
    }
    await user.save()

    res.json({
        success:true,
        message:"Course edited successfully",
    })
   }catch(error){
    console.log("Error Occured while editing course=>",error)
    return res.status.json({
        success:false,
        message:"Something went wrong while editing the course"
    })
   }
}