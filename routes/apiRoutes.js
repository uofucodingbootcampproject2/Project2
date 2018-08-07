var db = require("../models");

module.exports = function(app) {
  app.get("/api/login", function(req, res) {
    console.log("get the error away");
    res.json(req.body);
  });

  app.post("/liking a dog/:id", function (req, res) {
    var sitterID = req.body.sitterID;
    var dogID = req.params.id;
    db.Pet.findAll({
      where: {
        id: dogID
      }
    }).then(function (result) {
      var likes = result[0].dataValues.sitter_likes;
      likes = likes + sitterID + ", ";
      db.Pet.update({
        sitter_likes: likes
      },{
        where: {
          id: dogID
        }
      });
      res.json(console.log("Updated"));
    });
  });

app.get("pulling liked sitters/:id", function(req, res){
  db.Pet.findAll({
    where: {
      id: req.params.id
    }
  }).then(function (result){
    var peopleArr = [];
    var likes = result[0].dataValues.sitter_likes;
    var people = likes.split(", ");
    db.Sitter.findAll({
    }).then(function (data){
      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < people.length; j++){
          if(people[j] === data[i].dataValues.id){
            peopleArr.push(data[i].dataValues);
          }
        }
      }
      res.json(peopleArr);
    });
  });
});

app.post("likeing sitters/:id", function(req, res){
  var sitterID = req.body.sitterID;
  var ownerID = req.params.id;
  db.Sitter.findAll({
    where :{
      id: sitterID
    }
  }).then(function(data){
    var likes = data[0].dataValues.sitter_likes;
    likes = likes + ownerID + ", ";
    db.Sitter.update({
      owner_likes: likes
    },{
      where:{
        id: sitterID
      }
    }).then(function (result){
      console.log(result);
      res.json("Updated");
    });
  });
});

app.get("pulling matched sitters and owners/:id", function(req, res){
  db.Sitter.findAll({
    where: {
      id: req.params.id
    }
  }).then(function (result){
    var peopleArr = [];
    var likes = result[0].dataValues.owner_likes;
    var people = likes.split(", ");
    db.Owner.findAll({
    }).then(function (data){
      for(var i = 0; i < data.length; i++){
        for(var j = 0; j < people.length; j++){
          if(people[j] === data[i].dataValues.id){
            peopleArr.push(data[i].dataValues);
          }
        }
      }
      res.json(peopleArr);
    });
  });
});