/*
    *  -------------------------------------------------------------------  *
    *  -----  03-function-como-promesa.js  --  /03-function-como-promesa.js  -----  *
    *  -------------------------------------------------------------------  *
 */

$(() => {


    const $number = $('#number');
    const $result = $('#result');


    //  -----  funcion como promesa  -----

    const isPair = function (n) {

        const deferred = $.Deferred();

        deferred.notify('Comprobando si el número es par...');

        if (isNaN(n)) {
            deferred.reject('Error: El número no es un número');
        }

        if (n % 2 === 0) {
            deferred.resolve('¡¡Es par!!');
        }
        else {
            deferred.reject('Mal!!!');
        }

        deferred.notify('Fin de la comprobación...');

        return deferred.promise();
    };


    /**
     * @param {JQuery} $container
     * @param {string} message
     * @param {string} [color='blue']
     */
    const showMessage = function ($container, message, color = 'blue') {

        const msg = `<br><span style="color: ${color};">${message}</span>`;
        $container.html(msg);
    };


    $number.on('change', function () {

        const number = $number.val();

        isPair(number)
            .done((message) => showMessage($result, message))
            .fail((message) => showMessage($result, message, 'red'));
    });


});
