$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var currentUser;
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    currentUser = data;
    console.log(currentUser);
    matchOwner(currentUser);
  });
  function matchOwner(currentUser){
    $.get("/api/owner/" + currentUser.id, function(results){
      console.log(results.UserId);
    
      if(results.UserId !== undefined){
        $("#createOwner").hide();
      
      }else{
        $("#createOwner").show();
      }
    });
  }
});
