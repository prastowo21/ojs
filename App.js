const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {
    getJournal,
    getJournalById,
    searchJournal,
    getAnnouncement,
    getAnnouncementById,
    getIssueById,
    downloadIssueFile
} = require('./routes/journal')
const port = 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ojs'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/api/journal', getJournal);
app.get('/api/journal/search', searchJournal);
app.get('/api/journal/:id', getJournalById);
app.get('/api/announcement', getAnnouncement);
app.get('/api/announcement/:id', getAnnouncementById);
app.get('/api/issue/download', downloadIssueFile);
app.get('/api/issue/:id', getIssueById);



// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});