var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app){ 

  app.post("/liking a dog/:id", function (req, res) {
    db.Liked.create({
      OwnerId: req.body.OwnerId,
      PetId: req.params.id,
      Sitterid: req.body.SitterId
    }).then(function (data){
      res.json(data);
    });
  });

  app.get("pulling liked sitters/:id", function(req, res){
    db.Liked.findAll({
      where: {
        PetId: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
    
  });

  app.post("likeing sitters/", function(req, res){
    db.Liked.update({
      Owner_likes_Sitter: true
    },
    {
      where: {
        PetId: req.body.PetId
      }
    }).then(function (data){
      res.json(data).catch(function (err) {
          res.json(err);
    });
  });

  app.get("pulling matched sitters and owners/:id", function(req, res){
    db.findAll({
      where: {
        PetId: req.params.PetId,
        Owner_likes_Sitter: true
      }
    }).then(function (data){
      res.json(data).catch(function (err) {
        res.json(err);
    })
  });
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
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
  app.get("/matches/:id", function (req, res) {
    var dogArr = [];
    var sitterInfo;
    var userInfo;
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
      
      db.User.findAll({
        where: {
          id: req.params.id
        }
      }).then(function (data) {        
        userInfo = data;
        console.log("User ID: " + userInfo[0].dataValues.id);
        db.Sitter.findAll({
          where: {
            UserId: sitterInfo[0].dataValues.id
          }
        }).then(function (nestedData){
          sitterInfo = nestedData;
          for (var i = 0; i < dogArr.length; i++) {
            //if(dogArr[i].dataValues.OwnerId === )
            if (sitterInfo[0].dataValues.gender === dogArr[i].dataValues.sitter_gender || dogArr[i].dataValues.sitter_gender === "either") {
              tempArr.push(dogArr[i]);
            }
          }
          
          for (var i = 0; i < dogArr.length; i++) {
            if (sitterInfo[0].dataValues.preferred_breed === tempArr[i].dataValues.breed) {
              combatabilityScore++;
              
            }
            if (sitterInfo[0].dataValues.preferred_size === tempArr[i].dataValues.size) {
              combatabilityScore++;
            
            }
            if (sitterInfo[0].dataValues.preferred_activity === tempArr[i].dataValues.activity_level) {
              combatabilityScore++;
              
            }
            var tempDog = new dog(tempArr[i].dataValues.id, tempArr[i].dataValues.image_link, combatabilityScore, tempArr[i].dataValues.name, tempArr[i].dataValues.breed);
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
          res.json(Returnobj);
        });
      });
    });
  });
};