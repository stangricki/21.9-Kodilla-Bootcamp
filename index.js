const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://stangricki:password-2@ds237748.mlab.com:37748/database-2"
);

const user = new mongoose.Schema({
  name: String,
  surname: String
});

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => {
    const User = mongoose.model("User", user, "testcollection");

    User.find(function(err, results) {
      if (err) {
        throw new Error(err);
      } else {
        return res.render("pages/index", { results });
      }
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
