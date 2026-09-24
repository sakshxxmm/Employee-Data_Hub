const User = require("../models/User");

exports.deleteUser = async (req, res) => {
  try {
    const userId =
      req.params?.id ||
      req.body?._id ||
      req.body?.id ||
      req.body?.userId ||
      req.query?.id;

    console.log("Delete request received. Target userId:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required for deletion",
      });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("User deleted successfully:", userId);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error occurred during user deletion:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting user",
      error: error.message,
    });
  }
};