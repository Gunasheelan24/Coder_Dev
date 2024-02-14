import express from "express";
import dotEnv from "dotenv";
import mongoose, { connect, Schema, model } from "mongoose";

dotEnv.config({ path: "./dot.env" });
const port = process.env.NODE_PORT | 3000;
const app = express();
app.use(express.json());

const Userschema = new Schema({
  name: String,
  age: String,
  gender: String,
  phone: Number,
});

const userModel = model("user", Userschema);

app.post("/", async (req, res, next) => {
  try {
    const { name, age, gender, phone } = req.body;
    const newUser = await userModel.create({
      name,
      age,
      gender,
      phone,
    });
    res.status(200).json({
      message: "User Created Succesfull",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/user", async (req, res, next) => {
  try {
    const user = await userModel.find({});
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
});

app.patch("/update/:id", async (req, res, next) => {
  try {
    const userData = await userModel.findById({
      _id: req.params.id,
    });
    userData.name = req.body.name;
    userData.save();
    res.status(200).json({
      message: "Success",
      user: userData,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteUser/:id", async (req, res, next) => {
  try {
    let newDeletedUser = await userModel.findById(req.body.id);
    res.status(200).json({
      status: "Success",
      message: "User Deleted Successfull",
    });
  } catch (error) {
    console.log(error);
  }
});

connect(
  `mongodb+srv://gunachelvan1624:Devikaa1624@welcomeback.soi0zhs.mongodb.net/?retryWrites=true&w=majority`
)
  .then((s) => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, (server) => console.log("Server Running In Port", port));
