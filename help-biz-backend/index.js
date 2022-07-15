const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
dotenv.config();

//here we have imported all custom routes
const authRoutes = require("./routes/auth")
const invoiceRoutes = require("./routes/invoice")


//connecting to the database
mongoose.connect(process.env.DB_STRING, (err) => {
    if (err) {
        console.log("Unable to connect to database")
    }
    else {
        console.log("successfully connected to database :)")
    }
})

const port = process.env.PORT || 8000


app.use(bodyParser.json());
app.use(cors())

app.use("/api/auth/", authRoutes)
app.use("/api/invoice/", invoiceRoutes)
app.get("/ok", (req, res) => {
    return res.status(200).send("<h1>hi</h1>")
})


app.listen(port, () => {
    console.log(`backend is running on :`);
    console.log(`http://localhost:${port}/`)
})
