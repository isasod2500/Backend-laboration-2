const express = require("express")
const app = express();
const cors = require("cors")
const mysql = require("mysql")
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser")

require('dotenv').config();

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(cors());
app.use(bodyParser.json())



const port = process.env.PORT || 3000;

const connection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

connection.connect((err) => {
    if (err) {
        return console.log(`Connection failed: ${err}`)
    }

    console.log(`Connected to database`)
})


app.get("/api", (req, res) => {
    res.json({message: `API Reached`})
});

app.get("/api/workexperience", (req, res) => {

    //GET USERS
    connection.query(`SELECT * FROM workexperience;`, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Something went wrong: " + err })
            return;
        }

        console.log(results)
        if (results.length === 0) {
            res.status(200).json({ workexperience: [] });
        } else {
            res.json(results)
        }
    })
});


app.post("/api/workexperience", (req, res) => {
    let companyname = req.body.company;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    //Felhantering

    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    };

    if (!companyname || !jobtitle || !location || !startdate || !enddate || !description) {

        errors.message = "Missing information in field";
        errors.details = "Please enter information in all fields"

        errors.https_response.message = "Bad Request";
        errors.https_response.code = "400"

        res.status(400).json(errors)
    }

    if (!errors.message) {
        connection.query(`INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description)VALUES(?, ?, ?, ?, ?, ?)`, [companyname, jobtitle, location, start, end, description], (err, results) => {
            
            
            if (err) {
                res.status(500).json({ error: "Something went wrong: " + err })
                return;
            }
        });
        let work = {
            companyname: companyname,
            jobtitle: jobtitle,
            location: location,
            startdate: startdate,
            enddate: enddate,
            description: description,
        };
    }

    res.json({message: `Workexperience added`})
});
/*





app.put("/api/cv/:id", (req, res) => {
    res.json({ message: "User(s) updated: " + req.params.id });
});

app.delete("/api/cv/:id", (req, res) => {
    res.json({ message: "User(s) deleted: " + req.params.id });
});
*/

app.listen(port, () => {
    console.log(`Anslutning startad på port: ${port}`)
});