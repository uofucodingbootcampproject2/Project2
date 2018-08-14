$(document).ready(function () {
  var user;

  // Getting a reference to the input field where user adds a new todo
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    user = data;
    userEmail = user.email;
    match(user);
    console.log(user);
  });



  var formResults;
  var fullName;
  var newZipInput;
  var newPhoneInput;
  var newGenderInput;
  var newAgeInput;

  function match(user) {
    $.get("/api/user/owner/" + user.id, function (results) {
      console.log(results);

      if (results.Sitter !== null) {
        $("#nameRow").hide();
        $("#additionalInfo").hide();
        fullName = results.Sitter.name;
        newZipInput = results.Sitter.zipcode;
        newPhoneInput = results.Sitter.contact;
        newGenderInput = results.Sitter.gender;
        newAgeInput = results.Sitter.age;
        formResults = false;
      } else {
        $("#nameRow").show();
        $("#additionalInfo").show();
        formResults = true;
      }
    });
  }

  $("#ownerForm").submit(function (event) {

    event.preventDefault();
        
    if (formResults === true) {
      fullName = $("#firstName").val().trim() + " " + $("#lastName").val().trim();
      newGenderInput = $("#gender").val().trim();
      newAgeInput = $("#age").val().trim();
      newZipInput = $("#inputZip").val().trim();
      newPhoneInput = $("#phone").val().trim();
    }
       

    var owner = {
      name: fullName,
      gender: newGenderInput,
      email: userEmail,
      contact: newPhoneInput,
      zipcode: parseInt(newZipInput),
      age: newAgeInput,
      UserId: user.id
    };
    console.log(owner);
    $.post("/api/owner", owner).then(updateOwner);


    function updateOwner(owner) {
      $.ajax({
        method: "PUT",
        url: "/api/owner",
        data: owner
      })
        .then(function () {
          window.location.href = "../members";
        });
    }
  });



});
