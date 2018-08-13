$(document).ready(function () {
    var user;
    var dogArr = [];
    // Getting a reference to the input field where user adds a new todo
    $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
        user = data;
        console.log(user.id);
        userEmail = user.email;
        ownerMatch(user);
    });
    function ownerMatch(user) {
        $.get("/api/user/owner/" + user.id, function (outcome) {
            console.log(outcome);
            showMatches(outcome);
        });
    }

    function showMatches(outcome) {
        $.get("/api/dogs", function (results) {
            console.log(results);
            $.each(results, function (j) {
                if(outcome.Owner !== null){
                if (results[j].OwnerId !== outcome.Owner.id) {
                    if (results[j].sitter_gender === outcome.Owner.gender) {
                        dogArr.push(results[j]);
                    } else if (results[j].sitter_gender === "either") {
                        dogArr.push(results[j]);
                    }
                }
            }else{
                dogArr.push(results[j]);
            }
            });


            for (var i = 0; i < dogArr.length; i++) {
                //$.each(results, function (i) {

                var likeBtn = $("<button class='btn likeButton'>");
                var divCol = $("<div class='col-md-2  text-white'>");
                var divCard = $("<div class='card bg-dark text-white'>");
                var divImg = $("<img class='card-img' src='' alt='Card image'>");
                var divOvrly = $("<div class='card-img-overlay'>");
                var divCardTitle = $("<h5 class='card-title'>Card title</h5>");
                var divCardText = $("<p class='card-text'>");
                var divCardText2 = $("<p class='card-text'>");
                divImg.attr("src", results[i].image_link);
                divCardTitle.text(results[i].name);
                divCardText.text(results[i].breed);
                divCardText2.text(results[i].gender);
                likeBtn.text("Like");
                likeBtn.attr({
                    "data-petId": results[i].id,
                    "data-ownerId": results[i].OwnerId
                });
                $("#cardContainer").append(divCol);
                divCol.append(divCard);
                divCard.append(divImg);
                divCard.append(divOvrly);
                divOvrly.append(divCardTitle);
                divOvrly.append(divCardText);
                divOvrly.append(divCardText2);
                divCol.append(likeBtn);
                //});
            }
        });
        console.log(dogArr);
    console.log(outcome);
    $(document).on("click", ".likeButton", function(){
  console.log(outcome);
   var like = {
       Owner_ID: $(this).attr("data-ownerId"),
     PetId: $(this).attr("data-petId"),
     SitterId: outcome.Sitter.id
   };

console.log(like);
$.post("/liking/dog", like);

    });



    }
    //var testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //
    //var blankArr = [];
    //console.log(testArr);
    //$(".btn").on("click", function(){
    //var counter = 0;
    //
    //for(var i = 0; i < 5; i++){
    //counter ++;
    //blankArr.push(testArr[i]);
    //
    //console.log(counter);
    //}
    //testArr.splice(0, counter);
    //console.log(testArr);
    //console.log(blankArr);
    //});


    //$.get("/api/user/owner/" + currentUser.id, function (results) {});

    //});
});