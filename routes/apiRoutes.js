var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Pet.findAll({}).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Pet.create(req.body).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Pet.destroy({ where: { id: req.params.id } }).then(function(
      dbPet
    ) {
      res.json(dbPet);
    });
  });

  app.get("/api/match/:id", function (req, res) {
    var dogArr = [];
    var sitterInfo;
    var combatabilityScore = 0;
    var compatableArr = [];
    var tempArr = [];
    function dog(id, image, combatabilityScore, name, breed){
      this.id = id;
      this.image = image,
      this.combatabilityScore = combatabilityScore,
      this.name = name,
      this.breed = breed;
    }
    db.Pet.findAll({}).then(function (result) {
      dogArr = result;
      console.log(dogArr);
      db.Sitter.findAll({
        where: {
          id: req.params.id
        }
      }).then(function (data) {
        sitterInfo = data;
        for (var i = 0; i < dogArr.length; i++){
          if(dogArr[i].dataValues.sitter_gender !== "either" && dogArr[i].dataValues.sitter_gender !== sitterInfo.gender){
            tempArr.push(dogArr[i]);
          }
        }
    
        for (var i = 0; i < tempArr.length; i++){
          for (var j = 0; j < dogArr.length; j++){
            if(tempArr[i].id === dogArr[j].id){
              dogArr.splice(j, 1);
            }
          }
        }
    
        for(var i = 0; i < dogArr.length; i++){
          if(sitterInfo[0].dataValues.gender === dogArr[i].dataValues.sitter_gender || dogArr[i].dataValues.sitter_gender === "either"){
            combatabilityScore++;
          }
          if(sitterInfo[0].dataValues.preferred_breed === dogArr[i].dataValues.breed){
            combatabilityScore++;
          }
          if(sitterInfo[0].dataValues.preferred_size === dogArr[i].dataValues.size){
            combatabilityScore++;
          }
          if(sitterInfo[0].dataValues.preferred_activity === dogArr[i].dataValues.activity_level){
            combatabilityScore++;
          }
          var tempDog = new dog(dogArr[i].dataValues.id, dogArr[i].dataValues.image_link, combatabilityScore, dogArr[i].dataValues.name, dogArr[i].dataValues.breed);
          if(i < compatableArr.length){
            compatableArr.push(tempDog);
          }
          else{
            var splicePoint = compatableArr.length;
            for(var j = compatableArr.length - 1; j > 0; j--){
              if (compatableArr[j].combatabilityScore < tempDog.combatabilityScore){
                splicePoint = j;
              }
            }
            compatableArr.splice(splicePoint, 0, tempDog);
          }
          combatabilityScore = 0;  
        }
        var Returnobj = {
          Pets: []
        };
        Returnobj.Pets = compatableArr;
        res.json(Returnobj);
      });
    });
  });
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });



};

