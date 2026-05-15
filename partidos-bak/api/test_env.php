<?php
header('Content-Type: application/json');

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/config/database.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

$response = [
    "pdo_status" => "pending",
    "excel_status" => "pending",
    "errors" => []
];

// Test 1: Conexión PDO
try {
    $db = Database::getInstance()->getConnection();
    $response["pdo_status"] = "success: Conexion a MySQL exitosa.";
} catch (Exception $e) {
    $response["pdo_status"] = "error";
    $response["errors"][] = "Error PDO: " . $e->getMessage();
}

// Test 2: Prueba de PhpSpreadsheet y lectura de celda
$testExcelPath = __DIR__ . '/uploads/test_dummy.xlsx'; // Asegurate de subir un excel con este nombre para la prueba

if (file_exists($testExcelPath)) {
    try {
        $spreadsheet = IOFactory::load($testExcelPath);
        $sheet = $spreadsheet->getSheetByName('Estadisticas Jugadores');
        
        if ($sheet) {
            $val = $sheet->getCell("A2")->getValue();
            $response["excel_status"] = "success: PhpSpreadsheet funciona. Celda A2 = " . ($val ?? 'VACIA');
        } else {
            $response["excel_status"] = "error: Hoja 'Estadisticas Jugadores' no encontrada.";
        }
    } catch (Exception $e) {
        $response["excel_status"] = "error";
        $response["errors"][] = "Error Excel: " . $e->getMessage();
    }
} else {
    $response["excel_status"] = "warning: No se encontro el archivo uploads/test_dummy.xlsx para ejecutar la prueba de Excel. Sube uno manualmente para probar.";
}

echo json_encode($response, JSON_PRETTY_PRINT);
