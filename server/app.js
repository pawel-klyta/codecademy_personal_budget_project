const express = require("express");
const app = express();
const envelope_router = require("./envelope_router.js");

// specifing where to listen
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is active and listening on PORT ${PORT}.`);
});

// sending to browser on PORT
app.get("/", (req, res, next) => {
    res.status(200).send("Hello World!")
});

// mounting the envelope router
app.use("/api/envelope", envelope_router);
