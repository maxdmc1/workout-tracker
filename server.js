const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
// const apiRoutes = require("./routes/apiroutes");

const PORT = process.env.PORT || 3000;

// const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// how do I seed the database - (npm run seed)

// where should the routes be written? - apiroutes folder
// the db is named workout, correct?

app.use(require("./routes/apiroutes"));

// apiRoutes(app)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
