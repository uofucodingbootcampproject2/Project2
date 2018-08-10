$(document).ready(function () {
  // Getting a reference to the input field where user adds a new todo
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    userEmail = data.email;
  });
  var stateSelect = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
  for (var i = 0; i < stateSelect.length; i++) {
    var option = $("<option></option>");
    option.text(stateSelect[i]);
    $("#inputState").append(option);
  }
  
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    userEmail = data.email;
  });
  
  $("#sitterForm").submit(function (event) {

    event.preventDefault();
    var fullAddress = $("#inputAddress").val().trim() + ", " + $("#inputCity").val().trim() + ", " + $("#inputState").val().trim() + " " + $("#zip").val().trim();
    console.log(fullAddress);
    var fullName = $("#firstName").val().trim() + " " + $("#lastName").val().trim();




    var $newGenderInput = $("#gen");
    var $newAgeInput = $("#age");
    //var $newEmailInput = $("#inputEmail4");
    var $newPhoneInput = $("#phone");

    var sitter = {
      name: fullName,
      gender: $newGenderInput.val().trim(),
      email: userEmail,
      contact: $newPhoneInput.val().trim(),
      address: fullAddress,
      age: $newAgeInput.val().trim()
    };
    
    $.post("/api/sitter", sitter, function() {
      window.location.href = "../profile.html";
    });

  });

});
