const express = require("express");
const cors = require("cors");
const mogoose = require("mongoose");

const path = require("path");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;

mogoose
  .connect(process.env.ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch(err => console.log(err));

const connection = mogoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
//   set up the routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

//   routes
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

// start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
