const notes = require("express").Router();
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");

// GET route for retrieving notes from the JSON db
notes.get("/", (req, res) => {
    // why ../ here but ./ in example, doesnt make sense
    readFromFile('../db/db.json').then((data) => 
    res.json(JSON.parse(data))
    );
});

