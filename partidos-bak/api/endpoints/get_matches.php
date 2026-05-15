<?php
require '../config/db.php';

try {
    $stmt = $pdo->query("SELECT * FROM matches_predictions ORDER BY id ASC");
    $matches = $stmt->fetchAll();
    
    header('Content-Type: application/json');
    echo json_encode($matches);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
