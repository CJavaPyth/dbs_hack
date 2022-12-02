const express = require("express");
const cors = require("cors"); // to call APIs from other URLs to our server
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const postRoutes = require("./Routes/PostRoutes");
const cookieParser = require("cookie-parser");
require('dotenv/config');

const app = express();

app.listen(4000, ()=> {
    console.log("Server started on port 4000");
})

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successful")
}).catch(err => {
    console.log(err.message);
});

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],          // only allow GET and POST
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);           //if url is /, we move to authRoutes
app.use("/", postRoutes)