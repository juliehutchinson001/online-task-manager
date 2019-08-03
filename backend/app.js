const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //body-parser no longer necessary with the new express

const homeRouter = require("./route/home");

app.use("/", homeRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${port}`);
});
