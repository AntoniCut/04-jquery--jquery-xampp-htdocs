/*
    *  -------------------------------------  *
    *  -----  05-handlebars-template-externo-ajax.js  -----  *
    *  -------------------------------------  *
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

        $.get(
            
            "partials/external-template.html",
            
            (/** @type {string} */ source) => {

                const template = Handlebars.compile(source);

                const title = String($title.val() ?? '');
                const body = String($body.val() ?? '');

                const context = {
                    "title": title,
                    "body": body
                };

                const html = template(context);

                showHTML(html);

            }, 
            
            "text"
        )
            .fail((error) => {
                console.error("Error al obtener el template externo:", error);
            });

    };



    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
        generate();
    });





});