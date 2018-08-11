var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  app.get("/api/owners", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Owner.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // GET route for getting all of the rows in the Owner database
  app.get("/api/owner", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Owner.findAll({
      include: [{model: db.Pet}, {model: db.User}],
    }).then(function (result) {
    // We have access to the Sitter as an argument inside of the callback function
      res.json(result);
    });
  });

  //remove this route
  app.get("/api/owner/sitter/:id", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Owner.findOne({
      
      where: { UserId: req.params.id},
      include: [{model: db.User}, {model:db.Sitter}]
    }).then(function (result) {
    // We have access to the Sitter as an argument inside of the callback function
      res.json(result);
    });
  });


  // GET route for getting one of the rows in the Owner database
  app.get("/api/owner/:id", function (req, res) {
    // findAll returns all entries for a table when used with no options
    db.Owner.findOne({
      where: {
        id: req.params.id
      },
      include: [{model: db.Pet}, {model: db.User}],
      
    }).then(function (result) {
    // We have access to the Sitter as an argument inside of the callback function
      res.json(result);
    });
  });

  // POST route for saving a new Sitter
  app.post("/api/owner", function (req, res) {
  // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.Owner.create({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address,
      age: req.body.age,
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

  // DELETE route for deleting Owner. We can get the id of the Owner to be deleted from
  // req.params.id
  app.delete("/api/owner/:id", function (req, res) {
    // We just have to specify which Owner we want to destroy with "where"
    db.Owner.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    });
  });

  // PUT route for updating Owner. We can get the updated Owner data from req.body
  app.put("/api/owner", function (req, res) {
    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Owner.update({
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address,
      age: req.body.age,
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