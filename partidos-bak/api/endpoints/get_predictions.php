<?php
require '../config/db.php';

header('Content-Type: application/json');

try {
    // Selección estricta de columnas mapeadas
    $stmt = $pdo->query("
        SELECT 
            partido_num, 
            local_team, 
            visitante_team, 
            primera_prediccion_polla, 
            gol_res_1_local, 
            gol_res_1_vis_1 
        FROM matches_predictions 
        ORDER BY partido_num ASC
    ");
    
    $results = $stmt->fetchAll();
    
    // Asegurar integridad de tipos y manejo de nulos
    $formatted = array_map(function($row) {
        return [
            'partido_num' => (int)$row['partido_num'],
            'local_team' => $row['local_team'],
            'visitante_team' => $row['visitante_team'],
            'primera_prediccion_polla' => $row['primera_prediccion_polla'] ?: 'Empate',
            'gol_res_1_local' => (int)($row['gol_res_1_local'] ?? 0),
            'gol_res_1_vis_1' => (int)($row['gol_res_1_vis_1'] ?? 0)
        ];
    }, $results);

    echo json_encode($formatted);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Error al obtener predicciones: ' . $e->getMessage()
    ]);
}
?>
