const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "cloudcomputingfinaldatabase.cnh8dbnhfkkc.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "Buffalowing!1",
    database: "CloudComputingFinalDatabase"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

app.post('/submit-report', (req, res) => {
    const { system_prompt, query_prompt, response } = req.body;
    console.log('Received values:', { system_prompt, query_prompt, response });
    const sql = "INSERT INTO reports (`system_prompt`, `query_prompt`, `response`) VALUES (?, ?, ?, ?)";
    const values = [system_prompt, query_prompt, response];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Error inserting data into database:', err);
            return res.json("Error");
        }
        else {
            console.log('Report submitted successfully');
            return res.json(data);
        }
    });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});