
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

// API routes import
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/groupRoutes");
const sprintRoutes = require("./routes/sprintRoutes");
const labelformatRoutes = require("./routes/labelformatRoutes");
const evaluationFormatRoutes = require("./routes/evaluationFormatRoutes");
const evaluationRoutes = require("./routes/evaluationRoutes");
// API Routes
app.use("/api/user", userRoutes);
app.use("/api/group", groupRoutes);
app.use("/api/sprint", sprintRoutes);
app.use("/api/labelformat", labelformatRoutes);
app.use("/api/evaluationformat", evaluationFormatRoutes);
app.use("/api/evaluation", evaluationRoutes);
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
  process.env.MONGO_NEW_URI ||
  "mongodb+srv://romain:romain@projetqualitdev.fkfmr.mongodb.net/qualite_dev?retryWrites=true&w=majority";
const PORT = process.env.PORT || 8080;

// Timer to limit attemps of connection to database (see .env: MONGO_CONNECTION_RETRY_DELAY)
const timer = (ms) => new Promise(res => setTimeout(res, ms));
let isDatabaseConnected = false;
async function loopConnectToDatabase() {
  while (true) {
    if (!isDatabaseConnected) {
      console.log(`Attempt to connect to database (${MONGO_URI})`);
      try {
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
        isDatabaseConnected = true;
  
      } catch (error) {
        console.log("Could not connect to database, error:");
        console.log(error);
        console.error(error);
        isDatabaseConnected = false;
      }
    }
    
    // Waiting a bit before trying to connect again
    await timer(process.env.MONGO_CONNECTION_RETRY_DELAY || 60000);
  }
}
loopConnectToDatabase();
