const notes = require("express").Router();
const { readAndAppend, readFromFile, writeToFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET route for retrieving notes from the JSON db
notes.get("/", (req, res) => {
    // why ../ here but ./ in example, doesnt make sense
    readFromFile('./db/db.json').then((data) => 
    res.json(JSON.parse(data))
    );
});

// POST route for new notes to be added to the database
notes.post("/", (req, res) => {

    //destructure the note object passed in 
    const {title, text} = req.body;
    
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        };
        readAndAppend(newNote, "./db/db.json");
        res.json("Note added successfully!🚀");
    } else {
        res.error("Error in adding note :/");
    }

});

// DELETE route for existing notes to be deleted from the database
notes.delete("/:note_id", (req,res) => {
    const noteId = req.params.note_id;
    readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
        const result = json.filter( note => note.id !== noteId);
        writeToFile("./db/db.json", result);

        res.json(`Note ID ${noteId} has been deleted 🗑️`);
    });
});

module.exports = notes;