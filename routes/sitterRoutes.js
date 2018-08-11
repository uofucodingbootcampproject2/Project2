var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the rows in the Sitter database
  app.get("/api/sitter", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Sitter.findAll({}).then(function (result) {
      // We have access to the Sitter as an argument inside of the callback function
      res.json(result);
    });
  });
  
  // GET route for getting all of the rows in the Sitter database
  app.get("/api/sitter/:id", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Sitter.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (result) {
      // We have access to the Sitter as an argument inside of the callback function
      res.json(result);
    });
  });

  app.get("/api/owner/sitter/:id", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Owner.findOne({
      
      where: { UserId: req.params.id},
      include: [db.User]
    }).then(function (result) {
    // We have access to the Sitter as an argument inside of the callback function
      res.json(result);
    });
  });

  // POST route for saving a new Sitter
  app.post("/api/sitter", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Sitter.create({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address,
      age: req.body.age,
      preferred_breed: req.body.preferred_breed,
      preferred_size: req.body.preferred_size,
      preferred_activity: req.body.preferred_activity,
      image_link: req.body.link,
      UserId: req.body.UserId
    }).then(function (result) {
      // We have access to the new todo as an argument inside of the callback function
      res.redirect("/members");
      res.json(result);
    }).catch(function (err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
      res.json(err);
    });
  });

  // DELETE route for deleting Sitter. We can get the id of the Sitter to be deleted from
  // req.params.id
  app.delete("/api/sitter/:id", function (req, res) {
    // We just have to specify which Sitter we want to destroy with "where"
    db.Sitter.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });

  });

  // PUT route for updating Sitter. We can get the updated Sitter data from req.body
  app.put("/api/sitter", function (req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Sitter.update({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address,
      age: req.body.age,
      preferred_breed: req.body.preferred_breed,
      preferred_size: req.body.preferred_size,
      preferred_activity: req.body.preferred_activity,
      image_link: req.body.link,
      UserId: req.body.UserId
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