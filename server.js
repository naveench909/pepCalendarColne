const express = require("express");
const dotenv = require("dotenv");
const path = require('path')
dotenv.config({path : './config.env'});
require('./DB/connection');

//Variables
const port = process.env.PORT || 5000;

//intitalize
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded());

//Router
app.use(require('./router/router'));

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

// app.use("/api/calendar" , require("./Controllers/calendarController"));


// if(process.env.NODE_ENV === "production"){
//     app.use(express.static("frontend/build"))
// }

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
// });



app.listen(port , ()=>{console.log(`server started at ${port}`)});