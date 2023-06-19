const express = require("express");
const mongoose = require("mongoose");
const Intro = require("./model/Intro");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello");
});

//insert data into database
app.post("/intro", async (req, res) => {
  try {
    const introduction = await Intro.create(req.body);
    res.status(200).json(introduction);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

//fetch data from database
app.get("/intro", async (req, res) => {
  try {
    const introduction = await Intro.find({});
    res.status(200).json(introduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//fetch data from database using id
app.get("/intro/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const introduction = await Intro.findById(id);
    res.status(200).json(introduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update a data
app.put("/intro/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const introduction = await Intro.findByIdAndUpdate(id, req.body);

    //we can not find any introduction in database
    if (!introduction) {
      return res
        .status(404)
        .json({ message: `Cannot find any introduction with ID ${id}` });
    }
    const updatedData = await Intro.findById(id);
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete a data
app.delete("/intro/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const introduction = await Intro.findByIdAndDelete(id);
    if (!introduction) {
      return res
        .status(404)
        .json({ message: `Cannot find any introduction with ID ${id}` });
    }
    res.status(200).json(introduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb+srv://kishan:Kishan2004@cluster0.hecpdqa.mongodb.net/CRUD")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("App is running on port: " + PORT);
});
