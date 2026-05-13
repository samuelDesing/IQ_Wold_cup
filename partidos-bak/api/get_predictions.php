<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/config/database.php';

try {
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM predicciones_partidos ORDER BY partido ASC");
    $predictions = $stmt->fetchAll();

    echo json_encode(["status" => "success", "data" => $predictions]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error al obtener predicciones."]);
}
