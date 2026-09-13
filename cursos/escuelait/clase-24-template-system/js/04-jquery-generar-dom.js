/*
    *  ------------------------------------------  *
    *  -----  04-jquery-generar-dom.js  -----  *
    *  ------------------------------------------  *
*/


/// <reference path="../../../../types/global.d.ts" />



$(function () {


    const $myButton = $("#myButton");

    const $title = $("#title");
    const $body = $("#body");

    const $myDiv = $("#myDiv");
    const $myTextarea = $("#myTextarea");



    /**
     * --------------------------------
     * -----  `generateHTML()`  -----
     * --------------------------------
     * @returns {string} HTML generado con jQuery
     */
    const generateHTML = () => {

        const title = String($title.val() ?? '');
        const body = String($body.val() ?? '');

        const $div = $('<div>');
        const $h1 = $('<h1>').text(title);
        const $p = $('<p>').text(body);

        $div.append($h1, $p);

        return String($div.prop('outerHTML') ?? '');
    };




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

        const html = generateHTML();

        showHTML(html);

    };
   


    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
       generate();
    });


    


});