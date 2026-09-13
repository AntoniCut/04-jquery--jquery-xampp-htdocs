/*
    *  ---------------------------------------------------------------------  *
    *  -----  04-aplicando-conceptos.js  --  /04-aplicando-conceptos.js  -----  *
    *  ---------------------------------------------------------------------  *
 */

$(() => {


    //  -----  funcion como promesa (helper para los ejemplos)  -----

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



    //  -----  ejemplo 1: $.when con promesa propia y $.get  -----
    // Con varios deferreds, cada argumento del .done() es un array [valor, textStatus, jqXHR]
    const $resultEjemplo1 = $('#result-ejemplo-1');

    $.when(
        isPair(2),
        $.get('_partial-01.html')
    )
        .done((_isPairReturn, getReturn) => {
            const html = getReturn[0];
            showMessage($resultEjemplo1, html);
        })
        .fail(() => {
            showMessage($resultEjemplo1, 'Error', 'red');
        })
        .always(() => {
            console.info('always: isPair + get finalizado');
        });



    //  -----  ejemplo 2: $.when con un valor no diferido  -----
    // jQuery envuelve el 2 en una promesa ya resuelta
    const $resultEjemplo2 = $('#result-ejemplo-2');

    $.when(2)
        .done((n) => {
            console.log('$.when(2):', n);
            showMessage($resultEjemplo2, `$.when(2) devolvió: ${n}`);
        });



    //  -----  ejemplo 3: .then con éxito y fallo  -----
    const $resultEjemplo3Ok = $('#result-ejemplo-3-ok');
    const $resultEjemplo3Fail = $('#result-ejemplo-3-fail');

    $.when($.get('_partial-01.html'))
        .then(
            (html) => {
                console.info('then éxito:', html);
                showMessage($resultEjemplo3Ok, 'Petición correcta a _partial-01.html');
            },
            () => {
                console.info('then fallo');
                showMessage($resultEjemplo3Ok, 'Fallo inesperado', 'red');
            }
        );

    $.when($.get('_partial-no-existe.html'))
        .then(
            (html) => {
                console.info('then éxito:', html);
                showMessage($resultEjemplo3Fail, 'Éxito inesperado');
            },
            () => {
                console.info('then fallo: partial no encontrado');
                showMessage($resultEjemplo3Fail, 'Fallo esperado: partial no encontrado', 'red');
            }
        );



    //  -----  ejemplo 4: isPair con .progress  -----
    const $resultEjemplo4 = $('#result-ejemplo-4');

    isPair(2)
        .progress((notification) => {
            console.info('progress:', notification);
            showMessage($resultEjemplo4, notification, '#555');
        })
        .done((message) => {
            console.info('done:', message);
            showMessage($resultEjemplo4, message);
        })
        .fail((message) => {
            console.info('fail:', message);
            showMessage($resultEjemplo4, message, 'red');
        });



    //  -----  ejemplo 5: $.when con $.get y animación  -----
    const $numberEjemplo5 = $('#number-ejemplo-5');
    const $resultEjemplo5 = $('#result-ejemplo-5');

    $.when(
        $.get('_partial-01.html'),
        $numberEjemplo5.animate({ opacity: 0.5 }, 1000).animate({ opacity: 1 }, 1000)
    )
        .done(() => {
            console.info('get + animación terminados');
            $resultEjemplo5.text('get + animación terminados');
        });



    //  -----  ejemplo 6: $.when con .css (no es diferido)  -----
    // .css() no devuelve una animación: la promesa se resuelve al instante
    const $numberEjemplo6 = $('#number-ejemplo-6');

    $.when($numberEjemplo6.css({ 'font-weight': 'bold' }))
        .done(() => {
            console.info('css aplicado al instante');
        });



    //  -----  ejemplo 7: $.when con varias animaciones  -----
    const $numberEjemplo7 = $('#number-ejemplo-7');
    const $resultEjemplo7 = $('#result-ejemplo-7');

    $.when(
        $numberEjemplo7.animate({ 'margin-left': '+=10' }, 500),
        $resultEjemplo7.animate({ 'font-size': '+=2' }, 500)
    )
        .done(() => {
            console.info('animaciones terminadas');
        });



    //  -----  ejemplo 8: varios .done en la misma promesa  -----
    const $resultEjemplo8 = $('#result-ejemplo-8');
    const pairPromise = isPair(2);

    pairPromise.done(() => {
        console.log('done 1');
        showMessage($resultEjemplo8, 'done 1');
    });
    pairPromise.done(() => {
        console.log('done 2');
        showMessage($resultEjemplo8, 'done 2');
    });
    pairPromise.always(() => {
        console.log('always');
        showMessage($resultEjemplo8, 'always', '#555');
    });
    pairPromise.done(() => {
        console.log('done 3');
        showMessage($resultEjemplo8, 'done 3');
    });


});
