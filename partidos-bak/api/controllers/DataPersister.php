<?php
namespace App\Controllers;

require_once __DIR__ . '/../config/database.php';
use Database;
use PDO;
use Exception;

class DataPersister {
    public function save($data) {
        $db = Database::getInstance()->getConnection();
        $db->beginTransaction();

        try {
            $this->upsertStats($db, $data['stats']);
            $this->upsertPredictions($db, $data['predictions']);
            
            $db->commit();
        } catch (Exception $e) {
            $db->rollBack();
            throw $e;
        }
    }

    private function upsertStats($db, $stats) {
        if (empty($stats)) return;

        $sql = "INSERT INTO estadisticas_jugadores 
                (pais, portero, defensa, volante, extremo, delantero, goles_90_min_delanteros, goles_90_min_total, tarj_amarillas_prom) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                portero=VALUES(portero), defensa=VALUES(defensa), volante=VALUES(volante), extremo=VALUES(extremo), 
                delantero=VALUES(delantero), goles_90_min_delanteros=VALUES(goles_90_min_delanteros), 
                goles_90_min_total=VALUES(goles_90_min_total), tarj_amarillas_prom=VALUES(tarj_amarillas_prom)";
        
        $stmt = $db->prepare($sql);
        foreach ($stats as $row) {
            $stmt->execute([
                $row['pais'], $row['portero'], $row['defensa'], $row['volante'], 
                $row['extremo'], $row['delantero'], $row['goles_90_min_delanteros'], 
                $row['goles_90_min_total'], $row['tarj_amarillas_prom']
            ]);
        }
    }

    private function upsertPredictions($db, $preds) {
        if (empty($preds)) return;

        $sql = "INSERT INTO predicciones_partidos 
                (partido, fecha_partido, local, visitante, zona_local, zona_visitante, 
                ranking_fifa_local, ranking_fifa_visitante, puntos_fifa_local, puntos_fifa_visitante, 
                primera_prediccion_polla, segunda_prediccion_polla, gol_res_1_local, gol_res_1_vis_1, 
                gol_res_1_local_2, gol_res_1_vis_2, gol_res_1_local_3, gol_res_1_vis_3, 
                gol_res_2_local_1, gol_res_2_vis_1, gol_res_2_local_2, gol_res_2_vis_2, 
                gol_res_2_local_3, gol_res_2_vis_3) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                fecha_partido=VALUES(fecha_partido), local=VALUES(local), visitante=VALUES(visitante), 
                zona_local=VALUES(zona_local), zona_visitante=VALUES(zona_visitante), 
                ranking_fifa_local=VALUES(ranking_fifa_local), ranking_fifa_visitante=VALUES(ranking_fifa_visitante), 
                puntos_fifa_local=VALUES(puntos_fifa_local), puntos_fifa_visitante=VALUES(puntos_fifa_visitante), 
                primera_prediccion_polla=VALUES(primera_prediccion_polla), segunda_prediccion_polla=VALUES(segunda_prediccion_polla), 
                gol_res_1_local=VALUES(gol_res_1_local), gol_res_1_vis_1=VALUES(gol_res_1_vis_1), 
                gol_res_1_local_2=VALUES(gol_res_1_local_2), gol_res_1_vis_2=VALUES(gol_res_1_vis_2), 
                gol_res_1_local_3=VALUES(gol_res_1_local_3), gol_res_1_vis_3=VALUES(gol_res_1_vis_3), 
                gol_res_2_local_1=VALUES(gol_res_2_local_1), gol_res_2_vis_1=VALUES(gol_res_2_vis_1), 
                gol_res_2_local_2=VALUES(gol_res_2_local_2), gol_res_2_vis_2=VALUES(gol_res_2_vis_2), 
                gol_res_2_local_3=VALUES(gol_res_2_local_3), gol_res_2_vis_3=VALUES(gol_res_2_vis_3)";
        
        $stmt = $db->prepare($sql);
        foreach ($preds as $row) {
            $stmt->execute([
                $row['partido'], $row['fecha_partido'], $row['local'], $row['visitante'], 
                $row['zona_local'], $row['zona_visitante'], $row['ranking_fifa_local'], 
                $row['ranking_fifa_visitante'], $row['puntos_fifa_local'], $row['puntos_fifa_visitante'], 
                $row['primera_prediccion_polla'], $row['segunda_prediccion_polla'], 
                $row['gol_res_1_local'], $row['gol_res_1_vis_1'], $row['gol_res_1_local_2'], $row['gol_res_1_vis_2'], 
                $row['gol_res_1_local_3'], $row['gol_res_1_vis_3'], $row['gol_res_2_local_1'], $row['gol_res_2_vis_1'], 
                $row['gol_res_2_local_2'], $row['gol_res_2_vis_2'], $row['gol_res_2_local_3'], $row['gol_res_2_vis_3']
            ]);
        }
    }
}
