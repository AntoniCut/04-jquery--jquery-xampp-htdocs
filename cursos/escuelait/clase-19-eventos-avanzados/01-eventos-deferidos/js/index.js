/*
$(".estos").on("click", function(){
  $(this).text("hola hiciste click");
});

*/

$("#lateral").on("click", ".estos", function(){
  $(this).text("hola hiciste click");
});



$("button").click(function(){
  var elem = $("<div>").text("algo").addClass("estos").appendTo("#lateral");
});

