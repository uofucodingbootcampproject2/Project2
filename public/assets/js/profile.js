$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    var currentUser;





    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
        currentUser = data;
        console.log(currentUser);
        matches(currentUser);
    });
    
    function matches(currentUser) {
        $.get("/api/user/owner/" + currentUser.id, function (results) {
            console.log(results);
            if (results.Owner !== null) {
                $("#createOwner").hide();
            } else {
                $("#createOwner").show();
            }
            if (results.Sitter !== null) {
                $("#createSitter").hide();
            } else {
                $("#createSitter").show();
            }
        });
    }
    $("#viewMatches").on("click", function(){
        $.get("/matches/" + currentUser.id, function (res){
            console.log(res);
        });
    });
});