<?php
    sleep(3);
    if ($_REQUEST["user"] != "") {
?>
    {
    "valido": true,
    "mensaje": "Entrando..."
    }

<?php
    } else {
?>
    {
    "valido": false,
    "mensaje": "No se corresponde el usuario o la clave"
    }

<?php
    }
?>
