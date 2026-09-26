$(".elem, li").on("despertarse", function(){
  $(this).text("ahhhhhhhh");
});

$("div.elem, li").trigger("despertarse");
