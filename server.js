const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Routes import
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");

app.use(express.json());
app.use(express.static("public"));
app.get("/", async (req, res) => {
  res.send(
    "<h1>API_QUALITE_DEV</h1>\
      <p>Cette api fonctionne avec l'application \
      <a target='_blank' href='https://qualite-dev.herokuapp.com'>\
      QualiteDev</a>."
  );
});

app.use("/api", userRoutes);
app.use("/api", groupRoutes);

console.log("Connecting to db");
const MONGO_URI =
  "mongodb+srv://romain:romain@projetqualitdev.fkfmr.mongodb.net/qualite_dev?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((req, res) => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on http://localhost:3000/");
    });
  });

// db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("connecté à Mongoose");
// });
