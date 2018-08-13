$(document).ready(function () {
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    var currentUser;


    $.get("/api/user_data").then(function (data) {

        currentUser = data;
        console.log(currentUser);
        matches(currentUser);
    });

    function matches(currentUser) {
        $.get("/api/user/owner/" + currentUser.id, function (results) {
            console.log(results);
            if (results.Owner !== null) {
                $("#createOwner").hide();
                displayPets(currentUser);
            } else {
                $("#createOwner").show();
            }
            if (results.Sitter !== null) {
                $("#createSitter").hide();
            } else {
                $("#createSitter").show();
            }

            var divColOwn = $("<div class='col-6'>");
            var divColSit = $("<div class='col-6'>");
            var divOwnCard = $("<div class='card mt-5'>");
            var divSitCard = $("<div class='card mt-5'>");
            var ownName = $("<p>");
            var ownContact = $("<p>");
            var ownAge = $("<p>");
            var ownGender = $("<p>");
            var ownZip = $("<p>");
            var sitName = $("<p>");
            var sitContact = $("<p>");
            var sitAge = $("<p>");
            var sitGender = $("<p>");
            var sitAct = $("<p>");
            var sitSize = $("<p>");
            var sitBreed = $("<p>");
            var sitZip = $("<p>");

            ownName.text("Name: " + results.Owner.name);
            ownContact.text("Phone #: " + results.Owner.contact);
            ownAge.text("Age: " + results.Owner.age);
            ownGender.text("Gender: " + results.Owner.gender);
            ownZip.text("Zip Code: " + results.Owner.zipcode);
            sitName.text("Name: " + results.Sitter.name);
            sitContact.text("Phone #: " + results.Sitter.contact);
            sitAge.text("Age: " + results.Sitter.age);
            sitGender.text("Gender: " + results.Sitter.gender);
            sitZip.text("Zip Code: " + results.Sitter.zipcode);
            sitBreed.text("Preferred Breed: " + results.Sitter.preferred_breed);
            sitSize.text("Preferred Size: " + results.Sitter.preferred_size);
            sitAct.text("Preferred Activity: " + results.Sitter.preferred_activity);

            $("#profileInfo").prepend(divColOwn);
            $("#profileInfo").append(divColSit);
            divColOwn.append(divOwnCard);
            divOwnCard.append(ownName);
            divOwnCard.append(ownAge);
            divOwnCard.append(ownGender);
            divOwnCard.append(ownContact);
            divOwnCard.append(ownZip);
            divColSit.append(divSitCard);
            divSitCard.append(sitName);
            divSitCard.append(sitAge);
            divSitCard.append(sitGender);
            divSitCard.append(sitContact);
            divSitCard.append(sitZip);
            divSitCard.append(sitBreed);
            divSitCard.append(sitSize);
            divSitCard.append(sitAct);
        });
    }
    $("#viewMatches").on("click", function () {
        $.get("/matches/" + currentUser.id, function (res) {
            console.log(res);
            window.location.replace(res);
        });
    });
    function displayPets(currentUser) {
        $.get("/api/owner/" + currentUser.id, function (results) {

            console.log(results);

            for (var i = 0; i < results.Pets.length; i++) {
                //var divRow = $("<div class='row'>");
                var divCol = $("<div class='col-6'>");
                var divCard = $("<div class='card flex-row flex-wrap mt-2 mb-5'>");
                var divImg = $("<img class='card-img-top' src='' alt='Card image cap'>");
                var divCardHeader = $("<div class='card-header border-0'>");
                var divCardBlock = $("<div class='card-block px-2'>");
                var divCardName = $("<p class='card-text'></p>");
                var divCardBreed = $("<p class='card-text'></p>");
                var divCardSex = $("<p class='card-text'></p>");
                var divCardAge = $("<p class='card-text'></p>");
                var divCardSize = $("<p class='card-text'></p>");
                var divCardSocPeo = $("<p class='card-text'></p>");
                var divCardSocDog = $("<p class='card-text'></p>");
                var divCardLeash = $("<p class='card-text'></p>");
                var divCardActLvl = $("<p class='card-text'></p>");
                var divCardGen = $("<p class='card-text'></p>");
                var divCardFavAct = $("<p class='card-text'></p>");

                divImg.attr("src", results.Pets[i].image_link);
                divCardName.text("Name: " + results.Pets[i].name);
                divCardBreed.text("Breed: " + results.Pets[i].breed);
                divCardSex.text("Sex: " + results.Pets[i].sex);
                divCardAge.text("Age: " + results.Pets[i].age);
                divCardSize.text("Size: " + results.Pets[i].size);
                divCardGen.text("Preferred Gender(s): " + results.Pets[i].sitter_gender);
                divCardSocPeo.text("Social w/ People: " + results.Pets[i].social_w_people);
                divCardSocDog.text("Social w/ Dogs: " + results.Pets[i].social_w_dogs);
                divCardLeash.text("Leashed: " + results.Pets[i].leashed);
                divCardActLvl.text("Activity Level: " + results.Pets[i].activity_level);
                divCardFavAct.text("Favorite Activities: " + results.Pets[i].favorite_activities);

                $("#dogCards").append(divCol);
                divCol.append(divCard);
                divCard.append(divCardHeader);
                divCardHeader.append(divImg);
                divCard.append(divCardBlock);
                divCardBlock.append(divCardName);
                divCardBlock.append(divCardBreed);
                divCardBlock.append(divCardSex);
                divCardBlock.append(divCardAge);
                divCardBlock.append(divCardSize);
                divCardBlock.append(divCardGen);
                divCardBlock.append(divCardSocPeo);
                divCardBlock.append(divCardSocDog);
                divCardBlock.append(divCardLeash);
                divCardBlock.append(divCardActLvl);
                divCardBlock.append(divCardFavAct);

            }
        });
    }
});