// mongoose.connect(
//     process.env.MONGODB_URI,
//     {
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
//       replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
//     },
//     function (err) {
//       if (err) return console.log("Error: ", err);
//       console.log(
//         "MongoDB Connection -- Ready state is:",
//         mongoose.connection.readyState
//       );
//     }
//   );

const app = require("express")();

app.get("/", (req, res) => {
    res.send("coucou les cop1");
})

app.listen(3000, () => {
    console.log("Listening on http://localhost:3000/")
})
