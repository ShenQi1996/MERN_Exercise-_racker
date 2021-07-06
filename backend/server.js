const express = require("express");
const cors = require("cors");
const mogoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mogoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .catch(err => console.log(err));

const connection = mogoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

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
