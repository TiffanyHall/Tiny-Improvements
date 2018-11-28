var db = require('../models')

module.exports = function (app) {


    app.get("/api/users", function(req, res){
        db.Users.find({})
        .then(function (data){
            console.log("this is my data", data)
            res.json(data);
        })
        .catch(function (error){
            res.json(error);
        })
     
    });
    app.post("/api/users", function(req, res){
        db.Users.create(req.body)
        .then(function (data){
            res.json(data);
        })
        .catch(function (error){
            res.json(error);
        })
     
    });


    app.get("/api/kudo", function(req, res){
        db.Kudo.find({})
        .populate('to')
        .populate('from')
        .then(function (data){
            res.json(data);
        })
        .catch(function (error){
            res.json(error);
        })
    });

    app.post('/api/kudo', function (req, res) {
        const newEntry = {
          title: req.body.title,
          body: req.body.body,
          to: req.body.to,
          from: req.body.from
        }
        db.Kudo.create(newEntry)
        .then(function(data) {
          res.json(data);
        })
        .catch(function (error) {
          res.json(error);
        });
      });
    }
    

