var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://stangricki:password-2@ds237748.mlab.com:37748/database-2"
);

const user = new mongoose.Schema({
  name: String,
  surname: String
});

const User = mongoose.model("User", user, "testcollection");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  User.find(function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});
