/*
    *  -----------------------------------  *
    *  -----  handlebars-helpers.js  -----  *
    *  -----------------------------------  *
*/


/// <reference path="../../../../types/global.d.ts" />



$(function () {


    Handlebars.registerHelper("toH1", (text) => {
        
        return new Handlebars.SafeString(`<h1>${text}</h1>`);
    });


    Handlebars.registerHelper("toUl", (items, options) => {

        let $out = "<ul>";

        for (const item of items) {
            $out += `<li>${options.fn(item)}</li>`;
        }

        $out += "</ul>";

        return new Handlebars.SafeString($out);

    });

});
