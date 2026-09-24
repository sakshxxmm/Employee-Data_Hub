const User = require("../models/User");


exports.getUser = async (req, res) => {
	try {
		const userData = await User.find({});
		res.json({ success: true, data: userData });
	} catch (error) {
		res.status(500).json({ success: false, error: error });
	}
};

exports.getUserById = async (req,res) => {
	try{
		const {userId} = req.body
		if(!userId){
			return res.status(404).json({
				success:false,
				message:"User Id not found"
			})
		}
		const response = await User.findById(userId)
		if(!response){
			return res.status(404).json({
				success:false,
				message:"User not found"
			})
		}
		console.log("response=>",response)
		return res.status(200).json({
			success:true,
			message:"User found successfully",
			data:response
		})
	}catch(error){
		console.log("Error Occured while fetching user=>",error)
		return res.status(500).json({
			success:false,
			message:"Something went wrong"
		})
	}
}
