$(function(){
  $("#testBtn").on("click", function () {
    console.log("Huh?");
    $.get("/matches/" + 1, function (data) {
      console.log(data);
    });
  });
});