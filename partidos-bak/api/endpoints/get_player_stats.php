<?php
require '../config/db.php';

try {
    $stmt = $pdo->query("SELECT * FROM player_stats ORDER BY goles_90_total DESC");
    $stats = $stmt->fetchAll();
    
    header('Content-Type: application/json');
    echo json_encode($stats);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
