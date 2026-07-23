const { envelope } = require("./envelope.js");

// global variables

let totalBudget = 0;

// defining the Array in which the envelopes will be stored

const envelopeArr = [];

// functions that manipulate the array

// ads a new envolope returns the new envelope if succesfull or the error.
const addNewEnvelope = (name, description, budget) => {
    try {
        envelopeArr.push(new envelope(name, description, budget));
    } catch(error) {
        return `${error}`
    };
};


// get index by Id, returns the index of an envelope in the envelopeArr if it exists. If not it will return false
const getIndexById = (envelopeId) => {
    for (let index = 0; index < envelopeArr.length; index++) {
        if ( envelopeArr[index].id === envelopeId) {
            return index;
        };
    };
    return false;
};

// returns the envelope by Id. If the id doesnt exist it will return false
const getById = (envelopeId) => {
    const index = getIndexById(envelopeId);
    if (index !== false) {
        return envelopeArr[index];
    };
    return false;
};

// returns the envelope array and the total budget
const getAll = () => {
    return { totalBudget: totalBudget, allEnvelopes: envelopeArr };
};

// deletes an envelope by Id, if the operation was succesfull it returns true if not it returns false
const deleteById = (envelopeId) => {
    const index = getIndexById(envelopeId);
    if (index !== false) {
        envelopeArr.splice(index, 1);
        return true;
    } else {
        return false;
    };
};

//  Takes in (envelopeId, name, description, budget, spent) a property will only be changed if the provided value is truthy.
//  For example if (1, "", "", 400) only the budget of the envelope with an id of 1 will be changed.
//  If changes were made it will return the changed envelope, if not it will return false.
const editById = (envelopeId, name, description, budget, spent) => {
    const index = getIndexById(envelopeId);
    let changed = false;
    if (index !== false) {
        if (name !== "") {
            envelopeArr[index].name = name;
            changed = true;
        };
        if (description !== "") {
            envelopeArr[index].description = description;
            changed = true;
        };
        if (budget !== "") {
            envelopeArr[index].budget = budget;
            changed = true;
        };
        if (spent !== "") {
            envelopeArr[index].spent = spent;
            changed = true;
        };
        if (changed) {
            return envelopeArr[index];
        }
    };
    return false;
};

const resetById = (envelopeId) => {
    const index = getIndexById(envelopeId);
    if (index !== false) {
        envelopeArr[index].spentExplicit = 0;
        return true;
    };
    return false;
};

const getLast = () => {
    return getById(envelope.id - 1);
};

const transfer = (idFrom, amount, idDestination) => {
    const from = getById(idFrom);
    const leftFrom = from.budget - from.spent; // what budget is left
    if (leftFrom >= amount) {
        from.budget -= amount;
        getById(idDestination).budget += amount;
        return true;
    };
    return false;
};

module.exports = {
    getAll,
    addNewEnvelope,
    getIndexById,
    getById,
    deleteById,
    editById,
    resetById,
    getLast,
    transfer
};
