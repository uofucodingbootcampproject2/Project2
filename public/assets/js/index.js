// Get references to page elements
var $petName = $("#example-text");
var $petBreed = $("#example-description");
var $submitBtn = $("#submit");
var $petList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(pet) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(pet)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $pets = data.map(function(pet) {
      var $a = $("<a>")
        .text(pet.name)
        .attr("href", "/example/" + pet.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": pet.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $petList.empty();
    $petList.append($pets);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var pet = {
    name: $petName.val().trim(),
    breed: $petBreed.val().trim()
  };

  if (!(pet.name && pet.breed)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(pet).then(function() {
    refreshExamples();
  });

  $petName.val("");
  $petBreed.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$petList.on("click", ".delete", handleDeleteBtnClick);
