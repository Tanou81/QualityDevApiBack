require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Middelware
app.use(express.json());
app.use(express.static("public"));

// API routes import
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const sprintRoutes = require("./routes/sprintRoutes");

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/sprint", sprintRoutes);

// Root query
app.get("/", async (req, res) => {
  res.send(
    "<h1>API_QUALITE_DEV</h1>\
      <p>Cette api fonctionne avec l'application \
      <a target='_blank' href='https://qualite-dev.herokuapp.com'>\
      QualiteDev</a>."
  );
});

// Connection to MongoDB via mongoose
console.log("Connecting to db");
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://romain:romain@projetqualitdev.fkfmr.mongodb.net/qualite_dev?retryWrites=true&w=majority";
const PORT = process.env.PORT || 3000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((/*req, res*/) => {
    app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}/`);
    });
  });
