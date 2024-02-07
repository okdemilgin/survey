const express = require("express");
const cors = require ("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const database = require("./config/database");
const authRouter = require('./routes/auth.js');
const surveyRouter = require ('./routes/survey.js');



dotenv.config();

const app = express();
app.use(cors()) //bunlar mw
app.use(bodyParser.json({limit:'30mb', extended: true}))
app.use(bodyParser.urlencoded({limit:'30mb', extended: true}))
app.use('/', authRouter);
app.use('/',surveyRouter);


const PORT = 5000;

database();

app.listen(PORT, () => {
    console.log("server is listening...", PORT)
})



