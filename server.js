const express = require("express");
const { appendFile } = require("fs");
const path = require("path");
const { clog } = require("./middleware/clog");
const api = require('./routes/index.js');

const PORT = process.env.port || 3001;

const app = express();

//imports cusotm middleware "clog"
app.use(clog);

// middleware for parsign JSON & urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api", api);

app.use(express.static('public'));

// GET route for notes page
app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

//wildcard route directs users to the index.html page
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname,"/public/index.html"))
);


app.listen(PORT, () => 
    console.log(`App listening @ http://localhost:${PORT} 🚀`)
);
