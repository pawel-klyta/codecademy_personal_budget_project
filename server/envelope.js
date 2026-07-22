class envelope {
    static id = 0

    constructor(name, budget) {
        this.name = name;
        this.budget = budget;

        // assigning individual id
        this._id = envelope.id;
        envelope.id += 1;
    }

    // getters
    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get budget() {
        return this._budget;
    }

    // data validation with setters
    set name(name) {
        if (typeof name === "string" && name.length < 30) {
            this._name = name;
        } else {
            throw new Error("The assigned name has to be a string and have a maximum of 30 characters.");
        }
    }

    set budget(budget) {
        budget = parseInt(budget);
        if (Number.isInteger(budget) && budget > 0) {
            this._budget = budget; 
        } else {
            throw new Error("The assigned budget has to be an Integer and has to be greater than 0");
        }
    }
};