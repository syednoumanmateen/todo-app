const express = require("express")
const app = express()
const router = express.Router()
const cookieParser = require("cookie-parser");
const connectDB = require("../commonService/db");
const mongoose = require("mongoose");
const cors = require("cors")
const { swaggerUi, specs } = require("../commonService/swagger");
const port = process.env.PORT || 5000
const serviceAbb = process.env.SERVICEABB || BS

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./routes/blog.route")(router)
require("./routes/category.route")(router)
app.use(`/api/${serviceAbb}`, router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(port, () => {
  connectDB(mongoose)
  console.log(`Server running at:${port}`)
})