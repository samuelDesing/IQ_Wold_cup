<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/controllers/ExcelProcessor.php';
require_once __DIR__ . '/controllers/DataPersister.php';

try {
    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Error en la subida del archivo.");
    }

    $fileTmpPath = $_FILES['file']['tmp_name'];
    $fileName = $_FILES['file']['name'];
    $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

    if ($fileExtension !== 'xlsx') {
        throw new Exception("Formato de archivo invalido. Solo se permite .xlsx");
    }

    $destPath = __DIR__ . '/uploads/' . uniqid() . '.xlsx';
    if (!move_uploaded_file($fileTmpPath, $destPath)) {
        throw new Exception("No se pudo mover el archivo temporal.");
    }

    $processor = new App\Controllers\ExcelProcessor();
    $data = $processor->process($destPath);

    $persister = new App\Controllers\DataPersister();
    $persister->save($data);

    // Limpieza
    unlink($destPath);

    echo json_encode(["status" => "success", "message" => "Datos procesados y actualizados correctamente."]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
