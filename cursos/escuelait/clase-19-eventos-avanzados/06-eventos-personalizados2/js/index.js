
$(".elem")
	.slideUp(2000)
	.slideDown(2000, function(){
    //$(this).css("background-color", "#ddf");
    $(this).trigger("termine");
  });


$(".elem").on("termine", function(){
  $(this).css("background-color", "#9fd");
});


$(".elem").on("termine", function(){
  $(this).fadeOut(2000).fadeIn(2000);
  $(this).queue(function(sig){
    $(this).trigger("termine");
    sig();
  })
});

function timestampSegundos(){
	date = new Date();
	return Math.round(date.getTime()/1000);
}

$("div").on("termine", function(){
  $(this).text(timestampSegundos());
});
