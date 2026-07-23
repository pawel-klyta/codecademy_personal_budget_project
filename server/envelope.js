class envelope {
    static id = 0

    constructor(name, description, budget) {
        this.name = name;
        this.description = description;
        this.budget = budget;
        this._spent = 0;

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

    get description() {
        return this._description;
    }

    get budget() {
        return this._budget;
    }

    get spent() {
        return this._spent;
    }

    // data validation with setters
    set name(name) {
        if (typeof name === "string" && name.length < 30) {
            this._name = name;
        } else {
            throw new Error("The assigned name has to be a string and have a maximum of 30 characters.");
        }
    }

    set description(description) {
        if (typeof description === "string" && description.length < 200) {
            this._description = description;
        } else {
            throw new Error("The assigned description has to be a string and have a maximum of 200 characters.");
        }
    }

    set budget(budget) {
        budget = parseInt(budget);
        if (Number.isInteger(budget) && budget > 0) {
            this._budget = budget; 
        } else {
            throw new Error("The assigned budget has to be an integer and greater than 0");
        }
    }

    set spent(value) {
        value = parseInt(value);
        if (Number.isInteger(value) && value >= 0) {
            if ((value + this.spent) <= this.budget) {
                this._spent += value;
            } else {
                throw new Error("You cant spent more then you have available.");
            };
        } else {
            throw new Error("The assigned value has to be an integer and equal to or greater than 0");
        };
    }

    set spentExplicit(value) {
        this._spent = value;
    }
}

module.exports = { envelope };