//$("form").trigger("submit");
$("a").on("click", function(){
  $(this).text("hola");
});

$("a").on("click", function(){
  $(this).css("color", "red");
});

$("div, span").on("click", function(e){
  console.log("Click sobre ", e.target, this);
});

setTimeout(() => {
  $("a").trigger("click");
}, 5000);

