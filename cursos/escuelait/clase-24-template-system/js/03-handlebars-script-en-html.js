/*
    *  ----------------------------  *
    *  -----  03-handlebars-script-en-html.js  -----  *
    *  ----------------------------  *
*/


/// <reference path="../../../../types/global.d.ts" />



$(function () {


    const $myButton = $("#myButton");

    const $title = $("#title");
    const $body = $("#body");

    const $myDiv = $("#myDiv");
    const $myTextarea = $("#myTextarea");


    /**
     * ------------------------------
     * -----  `showHTML(html)`  -----
     * ------------------------------
     * @param {string} html - `HTML generado`
     */
    const showHTML = (html) => {
     
        $myDiv.html(html);
        $myTextarea.val(html);
    }


    /**
     * --------------------------
     * -----  `generate()`  -----
     * --------------------------
     */
    const generate = () => {
     
        const source = $("#myTemplate").html();

        const template = Handlebars.compile(source);

        const context = {
            "title": $title.val(),
            "body": $body.val()
        };

        const html = template(context);

        showHTML(html);

    }
   


    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
       generate();
    });


    


});