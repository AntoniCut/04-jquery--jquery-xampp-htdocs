/*
    *  -----------------------------------------------  *
    *  -----  08-handlebars-built-in-helpers.js  -----  *
    *  -----------------------------------------------  *
*/


/// <reference path="../../../../../types/global.d.ts" />



$(function () {


    const $myButton = $("#myButton");

    const $title = $("#title");
    const $id = $("#id");
    const $author = $("#author");
    const $body = $("#body");
    
    const $myDiv1 = $("#myDiv1");
    const $myTextarea1 = $("#myTextarea1");
    
    const $myDiv2 = $("#myDiv2");
    const $myTextarea2 = $("#myTextarea2");

    const $myDiv3 = $("#myDiv3");
    const $myTextarea3 = $("#myTextarea3");


    /** @type {{ firstName: string, lastName: string }[]} - `Personas del ejercicio` */
    const people = [
        { firstName: "John", lastName: "Doe" },
        { firstName: "Jane", lastName: "Doe" },
        { firstName: "Jim", lastName: "Beam" }
    ];


    /**
     * -----------------------------------------
     * -----  `ordenarPersonas(personas)`  -----
     * -----------------------------------------
     * - Ordena el array por apellido y, si coinciden, por nombre.
     * @param {{ firstName: string, lastName: string }[]} personas - `Personas a ordenar`
     * @return {{ firstName: string, lastName: string }[]}
     */
    const ordenarPersonas = (personas) => {

        return personas.sort((a, b) => {
            const porApellido = a.lastName.localeCompare(b.lastName, "es", {
                sensitivity: "base"
            });

            //  -----  si el apellido coincide, ordenar por nombre  -----
            if (porApellido !== 0) {
                return porApellido;
            }

            return a.firstName.localeCompare(b.firstName, "es", {
                sensitivity: "base"
            });

        });
        
    };


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
     * ------------------------------
     * -----  `showHTML3(html)`  -----
     * ------------------------------
     * @param {string} html - `HTML generado`
     */
    const showHTML3 = (html) => {
     
        $myDiv3.html(html);
        $myTextarea3.val(html);
    }


    /**
     * ---------------------------
     * -----  `generate1()`  -----
     * ---------------------------
     */
    const generate1 = () => {
     
        const source = $("#myTemplate1").html();

        const template = Handlebars.compile(source);

        const context = {
            title: $title.val() || null,
            id: $id.val() || null,
            author: $author.val() || null,
            body: $body.val() || null,
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
            title: "People",
            people: ordenarPersonas(people)
        };

        const html = template(context);

        showHTML2(html);
    }


    /**
     * ---------------------------
     * -----  `generate3()`  -----
     * ---------------------------
     */
    const generate3 = () => {
     
        const source = $("#myTemplate3").html();

        const template = Handlebars.compile(source);

        const context = {
            options: ordenarPersonas(people)
        };

        const html = template(context);

        showHTML3(html);
    }

    
    //  -----  Evento que se ejecuta cuando se hace click en el botón  -----
    $myButton.on("click", function () {
       generate1();
       generate2();
       generate3();
    });


});
