const User = require("../models/User");

exports.editUser = async (req, res) => {
  try {
    const userId = req.body.userId || req.body._id || req.body.id;
    console.log("Edit request received for userId:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required for updating",
      });
    }

    const updates = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    for (const key in updates) {
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (key === "_id" || key === "userId" || key === "id") continue;
        if (key === "name") {
          user.name = updates[key];
          user.image = `https://api.dicebear.com/5.x/initials/svg?seed=${updates[key]}`;
        } else {
          user[key] = updates[key];
        }
      }
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error occurred while editing user:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while editing the user",
      error: error.message,
    });
  }
};