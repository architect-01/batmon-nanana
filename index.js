const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express(); // create express app

const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.static("front/build"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "front", "build", "index.html"));
});

app.listen(port, () => {
    console.log("server started on port:", port);
});
