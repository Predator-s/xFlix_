const express = require("express");
const routes = require("./routes/v1");
const mongoose = require("mongoose");

const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

const port=8082;
const mongoose_url="mongodb://localhost:27017/xflix"



app.use("/v1", routes);

mongoose.connect(mongoose_url).then(() => {

  console.log("Connected to MongoDB");

 
  app.listen(port, () => {
    console.log(`App is running on port ${port}`);
  });
});