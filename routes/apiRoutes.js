var db = require("../models");

module.exports = function(app) {
  app.get("/api/matches/:id", function (req, res) {
    var dogArr = [];
    var sitterInfo;
    var combatabilityScore = 0;
    var compatableArr = [];
    var tempArr = [];
    function dog(id, image, combatabilityScore){
      this.id = id;
      this.image = image,
      this.combatabilityScore = combatabilityScore;
    }
    db.Pet.findAll({}).then(function (result) {
      dogArr = result;
    });
    db.Sitter.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      sitterInfo = result;
    });

    for (var i = 0; i < dogArr.length; i++){
      if(dogArr[i].sitter_gender !== "either" && dogArr.sitter_gender !== sitterInfo.gender){
        tempArr.push(dogArr[i]);
      }
    }

    for (var i = 0; i < tempArr.length; i++){
      for (var j = 0; j < dogArr.length; j++){
        if(tempArr[i].id === dogArr[j].id){
          dogArr.splice(j, 1);
        }
      }
    }

    for(var i = 0; i < dogArr.length; i++){
      if(sitterInfo.gender === dogArr[i].sitter_gender || dogArr.sitter_gender === "either"){
        combatabilityScore++;
      }
      if(sitterinfo.preferred_breed === dogArr[i].breed){
        combatabilityScore++;
      }
      if(sitterInfo.preferred_size === dogArr[i].size){
        combatabilityScore++;
      }
      if(sitterInfo.preferred_activity === dogArr[i].activity_level){
        combatabilityScore++;
      }
      var tempDog = new dog(dogArr.id, dogArr[i].image_link, combatabilityScore);
      if(i < compatableArr.length){
        compatableArr.push(tempDog);
      }
      else{
        for(var j = 0; j < compatableArr.length; j++){
          if (compatableArr[j].combatabilityScore < tempDog.combatabilityScore){
            compatableArr.splice(j, 0, tempDog);
          }
        }
      }
      combatabilityScore = 0;  
    }
    res.json(compatableArr);  
  });
};
