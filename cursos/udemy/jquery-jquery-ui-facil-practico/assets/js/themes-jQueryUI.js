



$(function () {

    
    console.warn('----------  script Themes jQuery UI  -- Cargado!!!  ----- ', '\n');
    
    
    //  -----  SELECTOR DE TEMA  -----

    const theme = $("#theme");
    const path = "./assets/css/themes-jquery-ui";

    // $(".btn-container").on('click', function () {

    //     const $btn = $(this); 
    //     $btn.css('margin-left', '0'); 

    //     setTimeout(() => $btn.css('margin-left', '-180px'), 5000);
    // });

    $("#to-lightness").click(function () {
        theme.attr("href", `${path}/ui-lightness/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-darkness").click(function () {
        theme.attr("href", `${path}/ui-darkness/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-base").click(function () {
        theme.attr("href", `${path}/base/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-black-tie").click(function () {
        theme.attr("href", `${path}/black-tie/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });


    $("#to-blitzer").click(function () {
        theme.attr("href", `${path}/blitzer/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-cupertino").click(function () {
        theme.attr("href", `${path}/cupertino/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-dark-hive").click(function () {
        theme.attr("href", `${path}/dark-hive/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-dot-luv").click(function () {
        theme.attr("href", `${path}/dot-luv/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-eggplant").click(function () {
        theme.attr("href", `${path}/eggplant/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-excite-bike").click(function () {
        theme.attr("href", `${path}/excite-bike/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-flick").click(function () {
        theme.attr("href", `${path}/flick/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-hot-sneack").click(function () {
        theme.attr("href", `${path}/hot-sneaks/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-humanity").click(function () {
        theme.attr("href", `${path}/humanity/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-le-frog").click(function () {
        theme.attr("href", `${path}/le-frog/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-mint-choc").click(function () {
        theme.attr("href", `${path}/mint-choc/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-overcast").click(function () {
        theme.attr("href", `${path}/overcast/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-pepper-grinder").click(function () {
        theme.attr("href", `${path}/pepper-grinder/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-redmond").click(function () {
        theme.attr("href", `${path}/redmond/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-smoothness").click(function () {
        theme.attr("href", `${path}/smoothness/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-south-street").click(function () {
        theme.attr("href", `${path}/south-street/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-start").click(function () {
        theme.attr("href", `${path}/start/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-sunny").click(function () {
        theme.attr("href", `${path}/sunny/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-swanky-purse").click(function () {
        theme.attr("href", `${path}/swanky-purse/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-trontastic").click(function () {
        theme.attr("href", `${path}/trontastic/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

    $("#to-vader").click(function () {
        theme.attr("href", `${path}/vader/jquery-ui.min.css`);
        $(".btn-container > button").removeClass('active');
        $(this).addClass('active');
    });

});
