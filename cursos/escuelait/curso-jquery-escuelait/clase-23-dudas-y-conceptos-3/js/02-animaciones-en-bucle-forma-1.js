/*
    *  ----------------------------------------  *
    *  -----  02-animaciones-en-bucle.js  -----  *
    *  ----------------------------------------  *
*/


$(function () {



    /** @type {JQuery<HTMLButtonElement>} - `btnPararReanudar` */
    const $btnPararReanudar = $("#btnPararReanudar");


    /** @type {JQuery<HTMLDivElement>} - `capa` */
    const $capa = $("#capa");


    /**
     * -----------------------------------
     * -----  `registrarVuelta()`  -----
     * -----------------------------------
     * - Incrementa el contador y reinicia el bucle.
     * @param {JQuery<HTMLDivElement>} elem - Capa animada.
     * @param {Function} sig - Callback de la cola jQuery.
     * @return {void}
     */
    function registrarVuelta(elem, sig) {
        
        if (elem.data("vueltas")) {
            elem.data("vueltas", elem.data("vueltas") + 1);
        } 
        
        else {
            elem.data("vueltas", 1);
        }
        
        elem.text(elem.data("vueltas"));
        
        moverBucle();
        sig();

    }


    /**
     * --------------------------------------------
     * -----  `encadenarTramoIzquierda()`  -----
     * --------------------------------------------
     * - Continúa el bucle desde el borde derecho.
     * @param {JQuery<HTMLDivElement>} elem - Capa animada.
     * @return {JQuery<HTMLDivElement>} - Cadena de animación.
     */
    function encadenarTramoIzquierda(elem) {
        
        return elem
            .queue(function (sig) {
                elem.data("fase", "transicion");
                sig();
            })
            .fadeOut()
            .delay(1000)
            .fadeIn()
            .queue(function (sig) {
                elem.data("fase", "izquierda");
                sig();
            })
            .animate({ left: "10px" }, 2000)
            .delay(1000)
            .queue(function (sig) {
                registrarVuelta(elem, sig);
            });
    }


    /**
     * ----------------------------
     * -----  `moverBucle()`  -----
     * ----------------------------
     * - Mueve la capa de forma indefinida.
     * @return {void}
     */
    function moverBucle() {

        /** @type {number} - `Ancho de la ventana` */
        const tamVentana = $(window).width();

        /** @type {number} - `Ancho del elemento` */
        const tamElemento = $capa.width();

        /** @type {number} - `Posición izquierda del borde derecho` */
        const destinoDerecha = tamVentana - tamElemento - 15;

        $capa.data("fase", "derecha");

        $capa
            .animate({ left: destinoDerecha + "px" }, 2000);

        encadenarTramoIzquierda($capa);
    }


    /**
     * ------------------------------
     * -----  `reanudarBucle()`  -----
     * ------------------------------
     * - Continúa la animación desde la posición actual.
     * @return {void}
     */
    function reanudarBucle() {

        /** @type {number} - `Ancho de la ventana` */
        const tamVentana = $(window).width();

        /** @type {number} - `Ancho del elemento` */
        const tamElemento = $capa.width();

        /** @type {number} - `Posición izquierda del borde derecho` */
        const destinoDerecha = tamVentana - tamElemento - 15;

        /** @type {number} - `Posición horizontal actual` */
        const posicionActual = $capa.position().left;

        /** @type {number} - `Duración base de cada tramo horizontal` */
        const duracionTotal = 2000;

        /** @type {number} - `Distancia total de un tramo horizontal` */
        const distanciaTotal = destinoDerecha - 10;

        /** @type {string | undefined} - `Fase actual del bucle` */
        const fase = $capa.data("fase");


        //  -----  tramo hacia la derecha  -----
        if (fase === "derecha") {

            /** @type {number} - `Distancia que falta por recorrer` */
            const distanciaRestante = destinoDerecha - posicionActual;

            /** @type {number} - `Duración proporcional al tramo pendiente` */
            const duracionRestante = (distanciaRestante / distanciaTotal) * duracionTotal;

            $capa.animate({ left: destinoDerecha + "px" }, duracionRestante);
            encadenarTramoIzquierda($capa);
            return;
        }


        //  -----  fade, pausa oculta o tramo hacia la izquierda  -----
        if (fase === "transicion") {
            encadenarTramoIzquierda($capa);
            return;
        }


        //  -----  tramo hacia la izquierda  -----
        if (fase === "izquierda") {

            /** @type {number} - `Distancia que falta por recorrer` */
            const distanciaRestante = posicionActual - 10;

            /** @type {number} - `Duración proporcional al tramo pendiente` */
            const duracionRestante = (distanciaRestante / distanciaTotal) * duracionTotal;

            $capa
                .animate({ left: "10px" }, duracionRestante)
                .delay(1000)
                .queue(function (sig) {
                    registrarVuelta($capa, sig);
                });
            return;
        }


        //  -----  sin fase guardada: empezar un ciclo nuevo  -----
        moverBucle();
    }

    $btnPararReanudar.on('click', function () {

        $capa.toggleClass('en-movimiento');


        //  -----  reanudar o iniciar la animación  -----
        if ($capa.hasClass('en-movimiento')) {

            if ($capa.data("pausado")) {
                $capa.data("pausado", false);
                reanudarBucle();
            } else {
                moverBucle();
            }
        }

        //  -----  pausar en la posición actual  -----
        else {
            $capa
                .data("pausado", true)
                .stop(true, false);
        }

    });
    

});
