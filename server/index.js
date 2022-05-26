/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require("./routes/user")
const signupRoutes=require("./routes/signup")
const authRoutes = require("./routes/auth")
const locationRoutes = require("./routes/location")
const commentRoutes = require("./routes/comment")
const passwordResetRoutes = require('./routes/passwordReset')
const adminRoutes = require("./routes/admin")
const path = require('path')
const db = mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("Database connected :", Port))
//
//'mongodb+srv://terrance:Terrance=777@cluster0.kflxp.mongodb.net/CS27Project'

const app = express();
app.use(express.static(path.join(__dirname,'/../client','build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));


//root path of signup.js
app.use("/api/signup", signupRoutes)
//root path of user.js
app.use("/api/user", userRoutes)
//root path of auth.js
app.use("/api/auth", authRoutes)
app.use("/api/location", locationRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/password-reset", passwordResetRoutes)
//root path of admin.js
app.use("/api/admin", adminRoutes)


const Port = 4000;
app.listen(Port);
