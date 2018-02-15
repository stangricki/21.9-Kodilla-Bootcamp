const express = require('express')
var mongoose = require('mongoose');
const path = require('path')
const PORT = process.env.PORT || 5000

mongoose.connect('mongodb://stangricki:password-2@ds237748.mlab.com:37748/database-2', {
    useMongoClient: true
    if(err){
        console.log(err);
    } else {
        console.log("Conected to DataBase.");
    }
});

/*
testcollection
{
    "_id": {
        "$oid": "5a85c7a5d574957d5b80bfe7"
    },
    "name": "Filip",
    "surname": "Stangricki"
}
*/

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
