var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the rows in the Pet database
  app.get("/api/dogs", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Pet.findAll({}).then(function (result) {
    // We have access to the Pets as an argument inside of the callback function
      res.json(result);
    });
  });

  // GET route for getting all of the rows in the Pet database
  app.get("/api/dogs", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Pet.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
    // We have access to the Pets as an argument inside of the callback function
      res.json(result);
    });
  });

  // POST route for saving a new Pet
  app.post("/api/dogs", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Pet.create({
      name: req.body.name,
      sex: req.body.sex,
      breed: req.body.breed,
      age: req.body.age,
      social_w_people: req.body.social_w_people,
      social_w_dogs: req.body.social_w_dogs,
      favorite_activities: req.body.favorite_activities,
      leashed: req.body.leashed,
      activity_level: req.body.activity_level,
      size: req.body.size,
      sitter_gender: req.body.sitter_gender,
      image_link: req.body.image_link,
      OwnerId: req.body.OwnerId
    }).then(function (result) {
    // We have access to the new todo as an argument inside of the callback function
      res.json(result);
    }).catch(function (err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // DELETE route for deleting Pet. We can get the id of the Pet to be deleted from
  // req.params.id
  app.delete("/api/dogs/:id", function (req, res) {
    // We just have to specify which Pet we want to destroy with "where"
    db.Pet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });  
  });

  // PUT route for updating Pet. We can get the updated Pet data from req.body
  app.put("/api/dogs", function (req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Pet.update({
      name: req.body.name,
      sex: req.body.sex,
      breed: req.body.breed,
      age: req.body.age,
      social_w_people: req.body.social_w_people,
      social_w_dogs: req.body.social_w_dogs,
      favorite_activities: req.body.favorite_activities,
      leashed: req.body.leashed,
      activity_level: req.body.activity_level,
      size: req.body.size,
      sitter_gender: req.body.sitter_gender,
      image_link: req.body.image_link
    }, {
      where: {
        id: req.body.id
      }
    }).then(function (dbPet) {
      res.json(dbPet);
    }).catch(function (err) {
    // Whenever a validation or flag fails, an error is thrown
    // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });
};