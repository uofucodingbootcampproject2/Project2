var db = require("../models");
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    //NEEDS TO BE FIXED
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    //NEEDS TO BE FIXED
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/frontPage.html"));
  });

  app.get("/index", function (req, res) {
    db.Pet.findAll({}).then(function (dbPets) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbPets
      });
    });
  });
  app.get("/matches/:id", function (req, res) {
    var dogArr = [];
    var sitterInfo;
    var combatabilityScore = 0;
    var compatableArr = [];
    var tempArr = [];
    function dog(id, image, combatabilityScore, name, breed) {
      this.id = id;
      this.image = image,
        this.combatabilityScore = combatabilityScore,
        this.name = name,
        this.breed = breed,
        this.active = false;
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
        for (var i = 0; i < dogArr.length; i++) {
          //if(dogArr[i].dataValues.OwnerId === )
          if (sitterInfo[0].dataValues.gender === dogArr[i].dataValues.sitter_gender || dogArr[i].dataValues.sitter_gender === "either") {
            tempArr.push(dogArr[i]);
          }
        }
        console.log(dogArr);
        console.log(sitterInfo);
        for (var i = 0; i < dogArr.length; i++) {
          if (sitterInfo[0].dataValues.preferred_breed === dogArr[i].dataValues.breed) {
            combatabilityScore++;
            console.log("Second Compatibility test: " + combatabilityScore);
          }
          if (sitterInfo[0].dataValues.preferred_size === dogArr[i].dataValues.size) {
            combatabilityScore++;
            console.log("Third Compatibility test: " + combatabilityScore);
          }
          if (sitterInfo[0].dataValues.preferred_activity === dogArr[i].dataValues.activity_level) {
            combatabilityScore++;
            console.log("Fourth Compatibility test: " + combatabilityScore);
          }
          var tempDog = new dog(dogArr[i].dataValues.id, dogArr[i].dataValues.image_link, combatabilityScore, dogArr[i].dataValues.name, dogArr[i].dataValues.breed);
          if (i < compatableArr.length) {
            compatableArr.push(tempDog);
          }
          else {
            var splicePoint = compatableArr.length;
            for (var j = compatableArr.length - 1; j > 0; j--) {
              if (compatableArr[j].combatabilityScore < tempDog.combatabilityScore) {
                splicePoint = j;
              }
            }
            compatableArr.splice(splicePoint, 0, tempDog);
          }
          combatabilityScore = 0;
        }
        var Returnobj = {
          pets: []
        };
        Returnobj.pets = compatableArr;
        Returnobj.pets[0].active = true;
        res.render("carousel", {
          pets: Returnobj.pets
        });
      });
    });
  });
};