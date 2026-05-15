<?php
require '../config/db.php';

header('Content-Type: application/json');

try {
    // Obtener todos los partidos ordenados cronológicamente
    $stmt = $pdo->query("
        SELECT 
            partido_num, 
            fecha_partido, 
            hora, 
            local_team, 
            visitante_team, 
            zona_local, 
            zona_visitante,
            primera_prediccion_polla,
            gol_res_1_local,
            gol_res_1_vis_1
        FROM matches_predictions 
        ORDER BY fecha_partido ASC, hora ASC
    ");
    
    $matches = $stmt->fetchAll();

    // Función para formatear fecha a español manual para asegurar compatibilidad
    function formatSpanishDate($dateStr) {
        $timestamp = strtotime($dateStr);
        $days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        $months = ['', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        
        $dayName = $days[date('w', $timestamp)];
        $dayNum = date('d', $timestamp);
        $monthName = $months[(int)date('m', $timestamp)];
        
        return "$dayName $dayNum de $monthName";
    }

    $grouped = [];
    foreach ($matches as $match) {
        $fecha = $match['fecha_partido'];
        if (!isset($grouped[$fecha])) {
            $grouped[$fecha] = [
                'fecha_raw' => $fecha,
                'fecha_label' => formatSpanishDate($fecha),
                'partidos' => []
            ];
        }

        $grouped[$fecha]['partidos'][] = [
            'partido_num' => (int)$match['partido_num'],
            'hora' => date('H:i', strtotime($match['hora'])),
            'local' => $match['local_team'],
            'visitante' => $match['visitante_team'],
            'zona_local' => $match['zona_local'] ?: null,
            'zona_visitante' => $match['zona_visitante'] ?: null,
            'prediccion' => $match['primera_prediccion_polla'] ?: 'Empate',
            'gol_local' => (int)($match['gol_res_1_local'] ?? 0),
            'gol_visitante' => (int)($match['gol_res_1_vis_1'] ?? 0)
        ];
    }

    // Convertir objeto asociativo a array indexado para React
    echo json_encode(array_values($grouped));

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Error al obtener calendario: ' . $e->getMessage()
    ]);
}
?>
