const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
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
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  // on start
  .get("/", (req, res) => getData(req, res))
  // on LOAD button
  .get("/get-data", (req, res) => {
    getData(req, res);
    res.redirect('/');
  })

  // on INSERT button
  .post("/insert", (req, res, next) => {
    var item = {
      name: req.body.name,
      surname: req.body.surname
    };
    var data = new User(item);
    data.save()
    res.redirect('/');
  })
  // on UPDATE button
  .post("/update", (req, res, next) => {
    var id = req.body.id;

    User.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
    doc.name = req.body.name;
    doc.surname = req.body.surname;
    doc.save();
  })
  res.redirect('/');
  })

  // on DELETE button
  .post("/delete", (req, res, next) => {
   var id = req.body.id;
    User.findByIdAndRemove(id).exec();
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