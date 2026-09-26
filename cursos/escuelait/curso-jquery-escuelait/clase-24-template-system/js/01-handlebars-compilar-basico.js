/*
    *  ----------------------------  *
    *  -----  01-handlebars-compilar-basico.js  -----  *
    *  ----------------------------  *
*/


/// <reference path="../../../../../types/global.d.ts" />



$(function () {


    const $myButton = $("#myButton");
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
     
        const source = '<h1> Template </h1>';

        const template = Handlebars.compile(source);

        const context = {};

        const html = template(context);

        showHTML(html);

    }


    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
       generate();
    });


});