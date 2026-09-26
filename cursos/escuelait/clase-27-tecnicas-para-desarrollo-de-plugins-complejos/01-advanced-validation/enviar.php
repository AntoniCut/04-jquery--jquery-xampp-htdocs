<?php

$nombre = isset($_POST['nombre']) ? trim((string) $_POST['nombre']) : '';
$telefono = isset($_POST['telefono']) ? trim((string) $_POST['telefono']) : '';

$ok = $nombre !== '' && $telefono !== '';

$mensaje = $ok
    ? 'Todo Ok: ' . $nombre . ' — ' . $telefono
    : 'Algo no ha ido bien';

?>
<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Clase 27 - Advanced Validation - Resultado</title>
</head>

<body>

    <h1><?php echo htmlspecialchars($mensaje, ENT_QUOTES, 'UTF-8'); ?></h1>

    <p><a href="index.html">Volver al ejercicio</a></p>

</body>

</html>
