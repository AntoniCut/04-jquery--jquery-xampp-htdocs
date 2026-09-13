/*
    *  ----------------------------------------------  *
    *  -----  06-handlebars-block-expressions.js  -----  *
    *  ----------------------------------------------  *
*/


/// <reference path="../../../../types/global.d.ts" />



$(function () {


    const $myButton = $("#myButton");

    const $title = $("#title");
    const $body = $("#body");

    const $myDiv1 = $("#myDiv1");
    const $myTextarea1 = $("#myTextarea1");

    const $myDiv2 = $("#myDiv2");
    const $myTextarea2 = $("#myTextarea2");


    /**
     * ------------------------------
     * -----  `showHTML1(html)`  -----
     * ------------------------------
     * @param {string} html - `HTML generado`
     */
    const showHTML1 = (html) => {
     
        $myDiv1.html(html);
        $myTextarea1.val(html);
    }


    /**
     * ------------------------------
     * -----  `showHTML2(html)`  -----
     * ------------------------------
     * @param {string} html - `HTML generado`
     */
    const showHTML2 = (html) => {
     
        $myDiv2.html(html);
        $myTextarea2.val(html);
    }


    /**
     * --------------------------
     * -----  `generate()`  -----
     * --------------------------
     */
    const generate1 = () => {
     
        const source = $("#myTemplate1").html();

        const template = Handlebars.compile(source);

        const context = {
            "title": $title.val(),
            "body": $body.val()
        };

        const html = template(context);

        showHTML1(html);

    }


    /**
     * ---------------------------
     * -----  `generate2()`  -----
     * ---------------------------
     */
    const generate2 = () => {
     
        const source = $("#myTemplate2").html();

        const template = Handlebars.compile(source);

        const context = {
            "people": [
                { "firstName": "John", "lastName": "Doe" },
                { "firstName": "Jane", "lastName": "Doe" },
                { "firstName": "Jim", "lastName": "Beam" }
            ]
        };

        const html = template(context);

        showHTML2(html);
   
    }


    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
       generate1();
       generate2();
    });


});
