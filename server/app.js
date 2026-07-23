const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const envelope_router = require("./envelope_router.js");

// specifing where to listen
const PORT = 3000;

// parsing the body
app.use(bodyParser.json());

// sending to browser on PORT
app.get("/", (req, res, next) => {
    res.status(200).send("Hello World!")
});

// mounting the envelope router
app.use("/api/envelopes", envelope_router);

// starting the server
app.listen(PORT, () => {
    console.log(`Server is active and listening on PORT ${PORT}.`);
});