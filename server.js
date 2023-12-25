require("dotenv").config();
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors({
    origin:  "http://localhost:3001"
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: process.env.HOST ,
    user: process.env.USER,
    password: process.env.MYSQL_P,
    database: process.env.DB,
    multipleStatements: true,
    // connectTimeout: 60000,
    timezone: 'utc',
})
db.connect((err)=>{
    if(err) throw err
    console.log("Connected!")
})
app.post('/event/arrival-confirmation',(req,res)=>{
    const {firstName, lastName, howMany } = req.body
    console.log(firstName)
    const sql = "INSERT INTO website (firstName, lastName, howMany) VALUES (?,?,?);"
    db.query(sql, [firstName,lastName, howMany],(err,result)=>{
        if(err) return res.json({message: "error"})
        return res.json({message: "success"})
    })
})

app.listen(3003, console.log("Server is running..."))