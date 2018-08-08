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


    $.post("/api/owner", owner);
    // $newItemInput.val("");
  });

  $("#dogForm").submit(function (event) {

    event.preventDefault();
  
    var $newDogNameInput = $("#dogName");
    var $newDogAgeInput = $("#dogAge");
    var $newSexInput = $("#dogSex");
    var $newBreedInput = $("#dogBreed");
    var $newPerfGenderInput = $("#dogPrefer");
    var $newFavActivitiesInput = $("#favActivities");
    var $newSocPeopleInput = $("#dogSocial");
    var $newSocDogInput = $("#dogOthers");
    var $newLeashInput = $("#dogLeash");
    var $newSizeInput = $("#dogSize");
    var $newActivityInput = $("#dogActivity");
    var $newDogImageInput = $("#dogImage");

    var dog = {
      name: $newDogNameInput.val().trim(),
      sex: $newSexInput.val(),
      breed: $newBreedInput.val().trim(),
      age: $newDogAgeInput.val(),
      social_w_people: $newSocPeopleInput.val(),
      social_w_dogs: $newSocDogInput.val(),

      favorite_activities: $newFavActivitiesInput.val().trim(),

      leashed: $newLeashInput.val(),
      activity_level: $newActivityInput.val(),
      size: $newSizeInput.val(),
      sitter_gender: $newPerfGenderInput.val(),
      image_link: $newDogImageInput.val().trim()

    
    };


    $.post("/api/dogs", dog);
    // $newItemInput.val("");
    console.log(dog);
  });
});























