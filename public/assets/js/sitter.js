$(document).ready(function () {
  var user;

  // Getting a reference to the input field where user adds a new todo
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    user = data;
    console.log(user.id);
    userEmail = user.email;
    match(user);
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
      if (results.Owner !== null) {
        $("#zipCol").hide();
        $("#infoRow").hide();
        fullName = results.Owner.name;
        newZipInput = results.Owner.zipcode;
        newPhoneInput = results.Owner.contact;
        newGenderInput = results.Owner.gender;
        newAgeInput = results.Owner.age;
        formResults = false;
      } else {
        $("#zipCol").show();
        $("#infoRow").show();
        formResults = true;

      }
    });
    console.log(formResults);
  }

  $("#sitterForm").submit(function (event) {

    event.preventDefault();

    if (formResults === true) {
      fullName = $("#firstName").val().trim() + " " + $("#lastName").val().trim();
      newGenderInput = $("#gen").val();
      newAgeInput = $("#age").val().trim();
      newZipInput = $("#zip").val().trim();
      newPhoneInput = $("#phone").val().trim();
    }

    var $newActivityInput = $("#dogActivity");
    var $newSizeInput = $("#dogSize");
    var $newBreedInput = $("#brd");
    var $newImageInput = $("#inputImage");


    var sitter = {
      name: fullName,
      gender: newGenderInput,
      email: user.email,
      contact: newPhoneInput,
      zipcode: newZipInput,
      age: newAgeInput,
      preferred_breed: $newBreedInput.val().trim(),
      preferred_size: $newSizeInput.val().trim(),
      preferred_activity: $newActivityInput.val().trim(),
      image_link: $newImageInput.val().trim(),
      UserId: user.id
    };

    console.log(sitter);
    $.post("/api/sitter", sitter).then(function () {
      $.ajax({
        method: "PUT",
        url: "/api/sitter",
        data: sitter
      })
        .then(function () {
          // window.location.href = "../members";
        });
    });





  });

});