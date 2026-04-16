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
    if(err) {
       return console.log(`Connection failed: ${err}`)
    }

    console.log(`Connected to database`)
})


app.get("/", (req, res) => {
  res.render("index", {
    errors: [],
  })
});

app.get("/api", (req, res) => {
    res.json({message: "API reached"});
});

app.get("/api/cv", (req, res) => {
      
    //GET USERS
    connection.query(`SELECT * FROM workexperience;` , (err, results) => {
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        }

        console.log(results)
        if(results.length === 0) {
            res.status(200).json({workexperience: []});
        } else {
            res.json(results)
        }
    })
});

app.post("/", (req, res) => {
    debugger;
    console.log(req.body)
    let company = req.body.company;
    let jTitle = req.body.jTitle; 
    let location = req.body.location;
    let start = req.body.startDate;
    let end = req.body.endDate;
    let description = req.body.description;

    //Felhantering

    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    };

    if(!company || !jTitle || !location || !start || !end || !description) {
        
        errors.message = "Missing information in field";
        errors.details = "Please enter information in all fields"
        
        errors.https_response.message = "Bad Request";
        errors.https_response.code = "400"


    }

    if(errors.length > 0) {
        res.render("/", {
            errors: errors,
            company: company,
            jTitle: jTitle,
            location: location,
            start: start,
            end: end,
            description: description,
        });
    };
    
    if(errors.length == 0) {
        (`INSERT INTO workexperience(company, jTitle, location, start, end, description)VALUES(?, ?, ?, ?, ?, ?)`, [company, jTitle, location, start, end, description]);
        res.redirect("/")
    }



    connection.query(`INSERT INTO users(name, email) VALUES(?, ?, ?, ?, ?, ?)`, [company, jTitle, location, start, end, description], (err, results)=> {
        if(err) {
            res.status(500).json({error: "Something went wrong: " + err})
            return;
        }

        console.log(`Query made ${results}`);

            
    let user = {
        name: name,
        email: email
    };

    res.json({message: "User added", user});
    });

});

app.put("/api/cv/:id", (req, res) => {
    res.json({message: "User(s) updated: " + req.params.id});
});

app.delete("/api/cv/:id", (req, res) => {
    res.json({message: "User(s) deleted: " + req.params.id});
});

app.listen(port, () => {
    console.log(`Anslutning startad på port: ${port}`)
});