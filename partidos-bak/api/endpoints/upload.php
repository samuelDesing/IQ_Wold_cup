<?php
require '../config/db.php';
require '../vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

header('Content-Type: application/json');

// Validar que la petición sea POST y haya un archivo
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_FILES['archivo_excel'])) {
    echo json_encode(['status' => 'error', 'message' => 'No se recibió ningún archivo']);
    exit;
}

$file = $_FILES['archivo_excel'];
$uploadDir = '../uploads/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0775, true);
}

$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($extension, ['xls', 'xlsx', 'csv'])) {
    echo json_encode(['status' => 'error', 'message' => 'Formato no válido (solo xls, xlsx, csv)']);
    exit;
}

$uploadFile = $uploadDir . time() . '_' . basename($file['name']);

if (!move_uploaded_file($file['tmp_name'], $uploadFile)) {
    echo json_encode(['status' => 'error', 'message' => 'Error al guardar archivo temporal']);
    exit;
}

try {
    $spreadsheet = IOFactory::load($uploadFile);
    
    // --- HOJA 1: Estadisticas Jugadores ---
    $sheetStats = $spreadsheet->getSheetByName('Estadisticas Jugadores');
    $statsInserted = 0;
    if ($sheetStats) {
        $rows = $sheetStats->toArray();
        array_shift($rows); // Quitar headers
        
        $stmtStats = $pdo->prepare("
            INSERT INTO player_stats (
                pais, portero, defensa, volante, extremo, delantero, 
                goles_90_delanteros, goles_90_total, tarj_amarillas_prom
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                portero=VALUES(portero), defensa=VALUES(defensa), volante=VALUES(volante),
                extremo=VALUES(extremo), delantero=VALUES(delantero), 
                goles_90_delanteros=VALUES(goles_90_delanteros), 
                goles_90_total=VALUES(goles_90_total), 
                tarj_amarillas_prom=VALUES(tarj_amarillas_prom)
        ");

        $pdo->beginTransaction();
        foreach ($rows as $row) {
            if (empty($row[0])) continue; // Si no hay país, saltar
            $stmtStats->execute([
                $row[0], $row[1], $row[2], $row[3], $row[4], $row[5], 
                $row[6], $row[7], $row[8]
            ]);
            $statsInserted++;
        }
        $pdo->commit();
    }

    // --- HOJA 2: Predicciones IQ ---
    $sheetPreds = $spreadsheet->getSheetByName('Predicciones IQ');
    $predsInserted = 0;
    if ($sheetPreds) {
        $rows = $sheetPreds->toArray();
        array_shift($rows); // Quitar headers
        
        $stmtPreds = $pdo->prepare("
            INSERT INTO matches_predictions (
                partido_num, fecha_partido, local_team, visitante_team, 
                zona_local, zona_visitante, ranking_fifa_local, ranking_fifa_visitante,
                puntos_fifa_local, puntos_fifa_visitante, primera_prediccion_polla, 
                segunda_prediccion_polla, gol_res_1_local, gol_res_1_vis_1, 
                gol_res_1_local_2, gol_res_1_vis_2, gol_res_1_local_3, gol_res_1_vis_3,
                gol_res_2_local_1, gol_res_2_vis_1, gol_res_2_local_2, gol_res_2_vis_2,
                gol_res_2_local_3, gol_res_2_vis_3
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            ON DUPLICATE KEY UPDATE
                fecha_partido=VALUES(fecha_partido), local_team=VALUES(local_team),
                visitante_team=VALUES(visitante_team), zona_local=VALUES(zona_local),
                zona_visitante=VALUES(zona_visitante), ranking_fifa_local=VALUES(ranking_fifa_local),
                ranking_fifa_visitante=VALUES(ranking_fifa_visitante), puntos_fifa_local=VALUES(puntos_fifa_local),
                puntos_fifa_visitante=VALUES(puntos_fifa_visitante), primera_prediccion_polla=VALUES(primera_prediccion_polla),
                segunda_prediccion_polla=VALUES(segunda_prediccion_polla), gol_res_1_local=VALUES(gol_res_1_local),
                gol_res_1_vis_1=VALUES(gol_res_1_vis_1), gol_res_1_local_2=VALUES(gol_res_1_local_2),
                gol_res_1_vis_2=VALUES(gol_res_1_vis_2), gol_res_1_local_3=VALUES(gol_res_1_local_3),
                gol_res_1_vis_3=VALUES(gol_res_1_vis_3), gol_res_2_local_1=VALUES(gol_res_2_local_1),
                gol_res_2_vis_1=VALUES(gol_res_2_vis_1), gol_res_2_local_2=VALUES(gol_res_2_local_2),
                gol_res_2_vis_2=VALUES(gol_res_2_vis_2), gol_res_2_local_3=VALUES(gol_res_2_local_3),
                gol_res_2_vis_3=VALUES(gol_res_2_vis_3)
        ");

        $pdo->beginTransaction();
        foreach ($rows as $row) {
            if (empty($row[0])) continue; // Si no hay número de partido, saltar
            $stmtPreds->execute([
                $row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6], $row[7],
                $row[8], $row[9], $row[10], $row[11], $row[12], $row[13], $row[14], $row[15],
                $row[16], $row[17], $row[18], $row[19], $row[20], $row[21], $row[22], $row[23]
            ]);
            $predsInserted++;
        }
        $pdo->commit();
    }

    // Borrar temporal
    unlink($uploadFile);

    echo json_encode([
        'status' => 'success', 
        'message' => "Procesado correctamente. Estadísticas: $statsInserted. Partidos: $predsInserted."
    ]);

} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log("Excel Upload Error: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Error al procesar el archivo: ' . $e->getMessage()]);
}
?>
