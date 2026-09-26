<?php

header('Content-Type: application/json; charset=utf-8');

$nombre = isset($_REQUEST['nombre']) ? trim((string) $_REQUEST['nombre']) : '';
$email = isset($_REQUEST['email']) ? trim((string) $_REQUEST['email']) : '';

$ok = $nombre !== '' && $email !== '';

$mensaje = $ok
    ? 'Recibido: ' . $nombre . ' <' . $email . '>'
    : 'Faltan nombre o email';

echo json_encode(
    [
        'ok' => $ok,
        'mensaje' => $mensaje,
    ],
    JSON_UNESCAPED_UNICODE
);
