<?php
//espera
sleep(4);
echo 'El amigo <b>' . $_POST["nombre"] . "</b><br> tiene " . $_POST["email"] . " email y es " . $_POST["sexo"];
echo "<p>Me gusta: " . $_POST["intereses"] . "</p>";
?>