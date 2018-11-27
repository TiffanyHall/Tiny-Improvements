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


    app.get("/api/kudo", function(req, res){
        db.Kudo.find({})
        .populate('user')
        .then(function (data){
            res.json(data);
        })
        .catch(function (error){
            res.json(error);
        })
    });

    app.post("/api/kudo", function(req, res){
        console.log(req.body)
        db.Kudo.create(req.body)
        .then(function (data){
           
           console.log("create response:", data)
            db.Users.find({})
            .then(function (data){console.log(data)})
            .catch(function(error){
                res.json(error);
            });
            // res.json(data);
        })
        .catch(function (error){
            res.json(error);
        })
    });

} 

