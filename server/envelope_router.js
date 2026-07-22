const express = require("express");
const data = require("./data.js");
const envelope_router = express.Router();
const app = express();

// middleware

envelope_router.param("id", (req, res, next, id) => {
    id = parseInt(id);
    const index = data.getIndexById(id);
    if (index === false) {
        return res.status(404).send("This ID doesn't exist");
    };
    req.index = index;
    req.id = id;
    next()
});

// routes
envelope_router.get("/", (req, res, next) => {
    res.status(200).send(data.getAll().allEnvelopes);
});

envelope_router.get("/:id", (req, res, next) => {
    res.status(200).send(data.getById(req.id))
});



module.exports = envelope_router;