const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 5000;

mongoose.connect(
  "mongodb://stangricki:password-2@ds237748.mlab.com:37748/database-2"
);

const userSchema = new mongoose.Schema({
  name: String,
  surname: String
});

const User = mongoose.model("User", userSchema, "testcollection");


express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  // on start
  .get("/", (req, res) => getData(req, res))
  // on LOAD button
  .get("/get-data", (req, res) => {
    getData(req, res);
    res.redirect('/');
  })
  // on INSERT button
  .post("/insert", (req, res, next) => {
    // TUTAJ!!!!!!!
    var item = {
      name: req.body.name,
      surname: req.body.surname
    };
    User.insert(item)
    res.redirect('/');
  })
  // on UPDATE button
  .post("/update", (req, res, next) => {
    var item = {
      name: req.body.name,
      surname: req.body.surname,
      id: ''//?????
    }
    User.update(item)
    res.redirect('/');
  })
  // on DELETE button
  .post("/delete", (req, res, next) => {
    var item = {
      id: ''//?????
    };
    User.delete(item)
    res.redirect('/');
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


const getData = (req, res) => {
  User.find(function(err, results) {
      if (err) {
        throw new Error(err);
      } else {
        return res.render("pages/index", { results });
      }
    });
}