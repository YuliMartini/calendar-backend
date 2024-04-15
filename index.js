const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

// create express server
const app = express();

// database
dbConnection();

// CORS
app.use(cors());

// public directory
app.use(express.static("public"));

// read and parse body
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

// listen to petitions
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
