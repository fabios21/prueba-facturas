const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/monolegal');
mongoose.Promise = global.Promise;

app.use(express.static(__dirname +"/public"));

app.use(express.json());

app.use('/api',require('./src/routes/index.routes'));

app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

app.listen(3000, function () {
    console.log("App listening on port 3000");
  });

app.get("*", function (req, res) {
    res.sendFile('/src/public/index.html', { root: __dirname });
  });
