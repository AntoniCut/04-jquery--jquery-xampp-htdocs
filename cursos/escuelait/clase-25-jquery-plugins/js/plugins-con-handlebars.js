/*
    *  -------------------------------------------------------------------------------------------------------------------  *
    *  -----  plugins-con-handlebars.js  --  /cursos/escuelait/clase-25-jquery-plugins/js/plugins-con-handlebars.js  -----  *
    *  -------------------------------------------------------------------------------------------------------------------  *
*/


$(function () {


    /*
        *  ---------------------------------  *
        *  -----  Referencias al HTML  -----  *
        *  ---------------------------------  *
    */


    /** @type {JQuery<HTMLDivElement>} - Contenedor con contexto como objeto */
    const $templateTarget = $('#templateTarget');

    /** @type {JQuery<HTMLDivElement>} - Contenedor con contexto desde URL JSON */
    const $templateTargetAjax = $('#templateTargetAjax');

    const url = 'data/template-data.json';

    /*
        *  -------------------------------------  *
        *    -----  Ejemplos individuales  -----  *
        *  -------------------------------------  *
    */


    //  -----  2º parámetro: objeto JSON  -----  //
    $templateTarget.templatize(
        'template',
        {
            title: 'Titulo como h4',
            body: 'Cuerpo como p',
        }
    );

    //  -----  2º parámetro: URL que devuelve JSON  -----  //
    $templateTargetAjax.templatize('template', url);
    

});
