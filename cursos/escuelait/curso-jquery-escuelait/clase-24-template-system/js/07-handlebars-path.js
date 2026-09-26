/*
    *  -----------------------------------  *
    *  -----  07-handlebars-path.js  -----  *
    *  -----------------------------------  *
*/


/// <reference path="../../../../../types/global.d.ts" />



$(function () {


    const $myButton = $("#myButton");

    const $title = $("#title");
    const $id = $("#id");
    const $author = $("#author");
    const $body = $("#body");
    
    const $myDiv = $("#myDiv");
    const $myTextarea = $("#myTextarea");


    /**
     * ------------------------------
     * -----  `showHTML1(html)`  -----
     * ------------------------------
     * @param {string} html - `HTML generado`
     */
    const showHTML = (html) => {
     
        $myDiv.html(html);
        $myTextarea.val(html);
    }

   
    /**
     * ---------------------------
     * -----  `generate2()`  -----
     * ---------------------------
     */
    const generate = () => {
     
        const source = $("#myTemplate").html();

        const template = Handlebars.compile(source);

        const context = {
            title: $title.val() || 'Título',
            body: $body.val() || 'Body',
            author: {
                id: $id.val() || 1,
                name: $author.val() || 'John Doe'
            }
        };

        const html = template(context);

        showHTML(html);
   
    }


    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
       generate();
    });


});
