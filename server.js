
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// Middelware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

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
const PORT = process.env.PORT || 8080;

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


  /*accès *//*
  const expresss = require("express");
var cors = require('cors')
const appp = expresss();
appp.use(cors());
const { createProxyMiddleware } = require('http-proxy-middleware');
appp.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:3000/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));
appp.listen(5000);*/

  
