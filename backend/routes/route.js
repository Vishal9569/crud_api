const express = require("express");
const User = require("../model/userModel.js");
const router = express.Router();

 
router.get("/all-user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

 
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

 
router.post("/add-user", async (req, res) => {
  const { id, username, number } = req.body;
  if (!id || !username || !number)
    return res.status(400).json({ msg: "All fields are required!" });

  try {
    const user = new User({ id, username, number });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});
 
router.patch("/update-user/:id", async (req, res) => {
  const { username, number } = req.body;
  if (!username || !number)
    return res.status(400).json({ message: "Nothing to update" });

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, number },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

 
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
