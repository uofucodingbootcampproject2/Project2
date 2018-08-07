$(document).ready(function () {
  // Getting a reference to the input field where user adds a new todo

  var stateSelect = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
  for (var i = 0; i < stateSelect.length; i++) {
    var option = $("<option></option>");
    option.text(stateSelect[i]);
    $("#inputState").append(option);
  }
  $("#ownerForm").submit(function (event) {

    event.preventDefault();
    var fullAddress = $("#inputAddress").val().trim() + ", " + $("#inputCity").val().trim() + ", " + $("#inputState").val().trim() + " " + $("#inputZip").val().trim();
    console.log(fullAddress);
    var fullName = $("#firstName").val().trim() + " " + $("#lastName").val().trim();




    var $newGenderInput = $("#gender");
    var $newAgeInput = $("#age");
    var $newEmailInput = $("#inputEmail4");
    var $newPhoneInput = $("#phone");

    var owner = {
      name: fullName,
      gender: $newGenderInput.val().trim(),
      email: $newEmailInput.val().trim(),
      contact: $newPhoneInput.val().trim(),
      address: fullAddress,
      age: $newAgeInput.val().trim()
    };



    // This function grabs todos from the database and updates the view
    


    // This function updates a todo in our database
    



    // This function inserts a new todo into our database and then updates the view



    $.post("/api/owner", owner);
    // $newItemInput.val("");
  }
  );
});























