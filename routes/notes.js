const notes = require("express").Router();
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");


// GET route for retrieving notes from the JSON db
notes.get("/", (req, res) => {
    // why ../ here but ./ in example, doesnt make sense
    readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data))
    );
});

notes.post("/", (req, res) => {

    //destructure the note object passed in 
    const {title, text} = req.body;
    
    if (req.body) {
        const newNote = {
            title,
            text,
        };
        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully!🚀");
    } else {
        res.error("Error in adding note :/");
    }

});

module.exports = notes;