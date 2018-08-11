$(document).ready(function () {
    var user;
   
    // Getting a reference to the input field where user adds a new todo
    $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
      user = data;
      console.log(user.id);
      userEmail = user.email;
      //matchOwner(user);
    });
    // function matchOwner(user){
    //   $.get("/api/user/owner/" + user.id, function(results){
    //
    //     console.log(results.Owner);
    //   });
    // }
  
  
    var stateSelect = ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
    for (var i = 0; i < stateSelect.length; i++) {
      var option = $("<option></option>");
      option.text(stateSelect[i]);
      $("#inputState").append(option);
    }
    
    
    
    $("#sitterForm").submit(function (event) {
  
      event.preventDefault();
      var fullAddress = $("#inputAddress").val().trim() + ", " + $("#inputCity").val().trim() + ", " + $("#inputState").val().trim() + " " + $("#zip").val().trim();
      console.log(fullAddress);
      var fullName = $("#firstName").val().trim() + " " + $("#lastName").val().trim();
  
  
  
  
      var $newGenderInput = $("#gen");
      var $newActivityInput = $("#dogActivity");
      var $newSizeInput = $("#dogSize");
      var $newBreedInput = $("#brd");
      var $newAgeInput = $("#age");
      var $newImageInput = $("#inputImage");
      var $newPhoneInput = $("#phone");
  
      var sitter = {
        name: fullName,
        gender: $newGenderInput.val().trim(),
        email: user.email,
        contact: $newPhoneInput.val().trim(),
        address: fullAddress,
        age: $newAgeInput.val().trim(),
        preferred_breed: $newBreedInput.val().trim(),
        preferred_size: $newSizeInput.val().trim(),
        preferred_activity: $newActivityInput.val().trim(),
        image_link: $newImageInput .val().trim(),
        UserId: user.id
      };
  
      console.log(sitter);
      $.post("/api/sitter", sitter).then(function(){
        $.ajax({
          method: "PUT",
          url: "/api/sitter",
          data: sitter
        })
          .then(function() {
            window.location.href = "../members";
          });
      });
  
      
       
      
  
    });
  
  });