import express from "express";
import User from "../model/User.js";
const router = express.Router();

//Create a user
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Read all users
router.get("/", async (req, res) => {

  const { name, email, age } = req.query;
try {
      let filter = {};

  if (name) {
    filter.name = name;
  }

  if (email) {
    filter.email = email;
  }

  if (age) {
    filter.age = age;
  }

  const users = await User.find(filter);

  res.status(200).json(users);

    
} catch (error) {
        res.status(404).send(error)

}
});

//Read single user by id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Invalid ID" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    res.status(404).json(error);
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted" });

  } catch (error) {
    res.status(404).json(error);
  }
});

export default router;