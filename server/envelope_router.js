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

envelope_router.post("/:id/spent/:value", (req, res, next) => {
    const value = parseInt(req.params.value);
    try {
        data.editById(req.id, "", "", "", value);
        res.status(200).send(data.getById(req.id));
    } catch(error) {
        res.status(500).send(error.message);
    }
});

// reseting the value spent
envelope_router.post("/:id/reset", (req, res, next) => {
    data.resetById(req.id);
    res.status(200).send(data.getById(req.id));
})

// for editing
envelope_router.put("/:id", (req, res, next) => {
    const previous = data.getById(req.id).spent;
    try {
        data.resetById(req.id);
        data.editById(req.id, req.body.name, req.body.description, req.body.budget, req.body.value);
        res.status(200).send(data.getById(req.id));
    } catch(error) {
        data.resetById(req.id);
        data.editById(req.id, "", "", "", previous);
        res.status(500).send(error.message);
    }
})

envelope_router.delete("/:id", (req, res, next) => {
    data.deleteById(req.id);
    res.status(204).send();
})

envelope_router.post("/", (req, res, next) => {
    data.addNewEnvelope(req.body.name, req.body.description, req.body.budget);
    res.status(201).send(data.getLast());
});

envelope_router.post("/transfer/:id/:amount/:destinationId", (req, res, next) => {
    const amount = parseInt(req.params.amount);
    const destinationId = parseInt(req.params.destination);
    // checking if Index is ok
    const destinationIndex = data.getIndexById(destination);
    if (index === false) {
        return res.status(404).send("This destination ID doesn't exist");
    };
    destinationId = id;
    // checking if amount is ok
    if (!(typeof amount === "number" && amount > 0)) {
        return res.status(400).send("The amount to transfer has to be a number and higher than 0.");
    };
    if (data.transfer(req.id, amount, destinationId)) {
        return res.status(200).send([data.getById(req.id), data.getById(destinationId)]);
    } else {
        return res.status(400).send("Amount was either to high or to low.");
    }
});

module.exports = envelope_router;