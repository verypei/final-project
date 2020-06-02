require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;


const router = require("./routes");
const http = require('http').createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

// app.listen(port, () => {
//   console.log(`Listening to this port ${port}`);
// });


// module.exports = app;

// app.listen(port,()=>{
//     console.log(`Listening to this port ${port}`);
// })

module.exports = http;

