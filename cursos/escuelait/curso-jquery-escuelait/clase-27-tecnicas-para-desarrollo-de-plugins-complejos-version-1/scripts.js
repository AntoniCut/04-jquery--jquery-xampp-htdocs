/*
    *  --------------------------------------------------------------------------------------  *
    *  -----  scripts.js  --  /cursos/escuelait/curso-jquery-escuelait/27-tecnicas-para-desarrollo-de-plugins-complejos-recursos/scripts.js  -----  *
    *  --------------------------------------------------------------------------------------  *
*/


/**
 * -------------------------------------------
 * -----  `handleValidateLinkClick(ev)`  -----
 * -------------------------------------------
 * - Valida el formulario al pulsar el enlace «validar» y muestra el resultado.
 * @param {JQuery.ClickEvent} e - Evento click del enlace.
 * @return {void}
 */
const handleValidateLinkClick = (e) => {

    e.preventDefault();

    /** @type {JQuery<HTMLFormElement>} - `formulario con el plugin` */
    const $form = $('form');

    /** @type {JQuery<HTMLDListElement>} - `contenedor del mensaje de feedback` */
    const $message = $('#message');

    $form.advancedValidation('validate')
        .done(function () {
            $message.text('El formulario es válido.');
        })
        .fail(function () {
            $message.text('Hay campos obligatorios vacíos.');
        });
};


/**
 * ---------------------------
 * -----  `initDemo()`  -----
 * ---------------------------
 * - Inicializa el plugin en el formulario y enlaza el botón de validación manual.
 * @return {void}
 */
const initDemo = () => {

    /** @type {JQuery} */
    const $form = $('form');

    const $validateLink = $('#validate');

    //  -----  al hacer submit del formulario, se valida el formulario  -----
    $form.advancedValidation({
        
        onIsValid: function() {
            console.log('Is Valid!!!');
        },

        onIsNotValid: function() {
            console.log('Is Not Valid!!!');
        }

    });

    //  -----  al hacer click en el enlace, se valida el formulario sin submit  -----
    $validateLink.on('click', handleValidateLinkClick);
};


$(initDemo);
