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


app.get("/", (req, res) => {
    res.json({ message: `API Reached` })
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
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let jobLocation = req.body.jobLocation;
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

    if (!companyname || !jobtitle || !jobLocation || !startdate || !enddate || !description) {

        errors.message = "Missing information in field";
        errors.details = "Please enter information in all fields"

        errors.https_response.message = "Bad Request";
        errors.https_response.code = "400"

        return res.status(400).json(errors)
    }

    if (!errors.message) {
        connection.query(`INSERT INTO workexperience(companyname, jobtitle, jobLocation, startdate, enddate, description)VALUES(?, ?, ?, ?, ?, ?)`, [companyname, jobtitle, jobLocation, startdate, enddate, description], (err, results) => {


            if (err) {
                res.status(500).json({ error: "Something went wrong: " + err })
                return;
            }

            return res.status(201)({ message: `Workexperience added` })
        });
        let work = {
            companyname: companyname,
            jobtitle: jobtitle,
            jobLocation: jobLocation,
            startdate: startdate,
            enddate: enddate,
            description: description,
        };


    }


});


app.put("/api/workexperience/:id", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let jobLocation = req.body.jobLocation;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;
    let id = req.params.id
    connection.query(
        `UPDATE workexperience
    SET companyname = ?, jobtitle = ?, jobLocation = ?, startdate = ?, enddate = ?, description = ?
    WHERE ID = ?`, [companyname, jobtitle, jobLocation, startdate, enddate, description, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: `Something went wrong: ${err}` })
            }

            return res.json({ message: "Entries updated: " + req.params.id + ", " + req.body.jobtitle + " på " + req.body.companyname });
        });

   
});

app.delete("/api/workexperience/:id", (req, res) => {
    const id = req.params.id
    connection.query(
        `DELETE FROM workexperience WHERE id = ?`, [id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: `Something went wrong: ${err}` })
            }
            return res.json({
                message: "User deleted",
                id: id,
                affectedRows: results.affectedRows
            });
        }
    )

});


app.listen(port, () => {
    console.log(`Anslutning startad på port: ${port}`)
});