# Simple api for managing personal budget with the envelope pricipal

## How to start the Server?

Make sure that node and npm is installed and set-up on your local machine. Type in the following commands inside of the route directory:

+ npm install

+ node ./server/app.js

## Envelope Scheme

constructor(name, description, budget)

+ name

+ description

+ budget

+ spent (assigned later, defines how much what was already spent from the budget, is not allowed to be higher than the current budget) 

+ id    (assigned automatically)

## Available Routes

### Get Routes

+ localhost:3000/api/envelopes => responds with an array with all envelopes

+ localhost:3000/api/envelopes/:id => responds with the envelope which has the id

### Delete Routes
+ localhost:3000/api/envelopes/:id => deletes the envelope which has the id

### Post Routes

+ localhost:3000/api/envelopes/:id/reset => sets the value of spent to 0

+ localhost:3000/api/envelopes/:id/spent/:value => increases the spent value with the amount of the value parameter

+ localhost:3000/api/envelopes/transfer/:id/:amount/:destinationId => transfers the amount of the parameter amount from the envolope with id (id) to the envelope with id (destinationId), if the amount doesnt exceed the balance left on the envolope with id (id)

+ localhost:3000/api/envelopes => creates a new envelope, the following properties are expected in the JSON.

    {
        "name": "example_name",
        "description": "example_description",
        "budget": "example_budget"
    }

### Put Routes

+ localhost:3000/api/envelopes/:id => edits the envelope with the given id, the following json is expected:

     {
        "name": "example_name",
        "description": "example_description",
        "budget": "example_budget",
        "spent": "example_spent"
    }


