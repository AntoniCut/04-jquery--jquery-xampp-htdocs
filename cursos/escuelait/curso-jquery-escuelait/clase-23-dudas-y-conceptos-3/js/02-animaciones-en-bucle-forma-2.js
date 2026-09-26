/*
    *  ----------------------------------------  *
    *  -----  02-animaciones-en-bucle.js  -----  *
    *  ----------------------------------------  *
*/


$(function () {


    /** - `Ventana del navegador` */
    const $window = $(window);

    /** @type {JQuery<HTMLButtonElement>} - `btnPararReanudar` */
    const $btnPararReanudar = $("#btnPararReanudar");

    /** @type {JQuery<HTMLDivElement>} - `capa` */
    const $capa = $("#capa");


    //  -----  Dimensiones de la ventana y el elemento  -----
    const tamVentana = $window.width();
    const tamElemento = $capa.width();

    /** @type {number} - `Posición izquierda del borde derecho` */
    const destinoDerecha = tamVentana - tamElemento - 15;

    /** @type {number} - `Posición izquierda del borde izquierdo` */
    const destinoIzquierda = 15;

    /** @type {number} - `Duración de cada tramo horizontal` */
    const duracionTramo = 5000;

    /** @type {number} - `Distancia total de un tramo horizontal` */
    const distanciaTramo = destinoDerecha - destinoIzquierda;

    /** @type {'izquierda' | 'derecha'} - `Dirección hacia donde va de la capa` */
    let direccion = 'derecha';

    //  -----  Guarda la dirección y fase de la capa  -----
    $capa.data('direccion', direccion);
    $capa.data('fase', 'derecha');


    /**
     * --------------------------------------------------------
     * -----  `calcularDuracionRestante(posicion, destino)`  -----
     * --------------------------------------------------------
     * - Calcula el tiempo que falta según la distancia pendiente.
     * @param {number} posicion - Posición horizontal actual.
     * @param {number} destino - Posición horizontal objetivo.
     * @return {number} - Duración restante en milisegundos.
     */
    const calcularDuracionRestante = (posicion, destino) => {
        const distanciaRestante = Math.abs(destino - posicion);
        return (distanciaRestante / distanciaTramo) * duracionTramo;
    };


    /**
     * -----------------------------------
     * -----  `registrarVuelta(sig)`  -----
     * -----------------------------------
     * - Incrementa el contador y reinicia el bucle.
     * @param {Function} sig - Callback de la cola jQuery.
     * @return {void}
     */
    const registrarVuelta = (sig) => {

        if ($capa.data("vueltas")) {
            $capa.data("vueltas", $capa.data("vueltas") + 1);
        } else {
            $capa.data("vueltas", 1);
        }

        $capa.text($capa.data("vueltas"));
        movimientoDerecha();
        sig();
    };


    /**
     * -----------------------------------
     * -----  `encadenarTransicion()`  -----
     * -----------------------------------
     * - Ejecuta la pausa y el fade entre tramo derecho e izquierdo.
     * @return {void}
     */
    const encadenarTransicion = () => {

        $capa.data('fase', 'transicion');

        $capa
            .delay(1000)
            .fadeOut(1000)
            .fadeIn(1000)
            .queue(function (sig) {
                sig();
                movimientoIzquierda();
            });
    };


    /**
     * -----------------------------------
     * -----  `movimientoDerecha()`  -----
     * -----------------------------------
     * - Mueve la capa hacia la derecha de la ventana.
     * @param {number} [duracion=duracionTramo] - Duración del tramo en ms.
     * @return {void}
     */
    const movimientoDerecha = (duracion = duracionTramo) => {

        $capa.data('direccion', 'derecha');
        $capa.data('fase', 'derecha');

        $capa
            .animate({
                left: destinoDerecha + "px"
            }, duracion)
            .queue(function (sig) {
                sig();
                encadenarTransicion();
            });
    }


    /**
     * --------------------------------
     * -----  `movimientoIzquierda()`  -----
     * --------------------------------
     * - Mueve la capa hacia la izquierda de la ventana.
     * @param {number} [duracion=duracionTramo] - Duración del tramo en ms.
     * @return {void}
     */
    const movimientoIzquierda = (duracion = duracionTramo) => {

        $capa.data('direccion', 'izquierda');
        $capa.data('fase', 'izquierda');

        $capa
            .animate({
                left: destinoIzquierda + "px"
            }, duracion)
            .delay(1000)
            .queue(function (sig) {
                registrarVuelta(sig);
            });

    }


    /**
     * ---------------------------
     * -----  `reanudar()`  -----
     * ---------------------------
     * - Continúa la animación desde la posición y fase actuales.
     * @return {void}
     */
    const reanudar = () => {

        /** @type {'derecha' | 'izquierda' | 'transicion' | undefined} - `Fase actual` */
        const fase = $capa.data('fase');

        /** @type {number} - `Posición horizontal actual` */
        const posicionActual = $capa.position().left;


        //  -----  tramo hacia la derecha  -----
        if (fase === 'derecha') {
            movimientoDerecha(calcularDuracionRestante(posicionActual, destinoDerecha));
            return;
        }


        //  -----  pausa y fade entre tramos  -----
        if (fase === 'transicion') {
            encadenarTransicion();
            return;
        }


        //  -----  tramo hacia la izquierda  -----
        if (fase === 'izquierda') {
            movimientoIzquierda(calcularDuracionRestante(posicionActual, destinoIzquierda));
            return;
        }


        //  -----  sin fase guardada: empezar desde la derecha  -----
        movimientoDerecha();
    };



    /**
     * --------------------------------
     * -----  `mover(direccion)`  -----
     * --------------------------------
     * - Mueve la capa a la izquierda y derecha de la ventana.
     * @param {'izquierda' | 'derecha'} direccion - `Dirección hacia donde va de la capa`
     * @return {void}
     */
    const mover = (direccion) => {

        if (direccion === 'derecha') {
            movimientoDerecha();
        }

        if (direccion === 'izquierda') {
            movimientoIzquierda();
        }

    }


    //  -----  Parar / Reanudar  -----
    $btnPararReanudar.on('click', function () {

        /** @type {'izquierda' | 'derecha'} - `Dirección hacia donde va de la capa` */
        const direccion = $capa.data('direccion');

        //  -----  Parar  -----
        if ($capa.hasClass('en-movimiento')) {

            $capa
                .data('pausado', true)
                .stop(true, false)
                .removeClass('en-movimiento');
        }

        //  -----  Reanudar o iniciar  -----
        else {
            $capa.addClass('en-movimiento');

            if ($capa.data('pausado')) {
                $capa.data('pausado', false);
                reanudar();
            } else {
                mover(direccion);
            }
        }

    });



});
