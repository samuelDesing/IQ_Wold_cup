<?php
namespace App\Controllers;

use PhpOffice\PhpSpreadsheet\IOFactory;
use Exception;

class ExcelProcessor {
    public function process($filePath) {
        try {
            $spreadsheet = IOFactory::load($filePath);
            
            $statsSheet = $spreadsheet->getSheetByName('Estadisticas Jugadores');
            $predictionsSheet = $spreadsheet->getSheetByName('Predicciones IQ');

            if (!$statsSheet || !$predictionsSheet) {
                throw new Exception("Faltan las hojas 'Estadisticas Jugadores' o 'Predicciones IQ'.");
            }

            $statsData = $this->parseStats($statsSheet);
            $predictionsData = $this->parsePredictions($predictionsSheet);

            return [
                'stats' => $statsData,
                'predictions' => $predictionsData
            ];
        } catch (Exception $e) {
            throw new Exception("Error al procesar el Excel: " . $e->getMessage());
        }
    }

    private function parseStats($sheet) {
        $highestRow = $sheet->getHighestRow();
        $data = [];
        // Asume fila 1 son headers
        for ($row = 2; $row <= $highestRow; $row++) {
            $pais = $sheet->getCell("A{$row}")->getValue();
            if (!$pais) continue;
            
            $data[] = [
                'pais' => $pais,
                'portero' => $sheet->getCell("B{$row}")->getValue(),
                'defensa' => $sheet->getCell("C{$row}")->getValue(),
                'volante' => $sheet->getCell("D{$row}")->getValue(),
                'extremo' => $sheet->getCell("E{$row}")->getValue(),
                'delantero' => $sheet->getCell("F{$row}")->getValue(),
                'goles_90_min_delanteros' => $sheet->getCell("G{$row}")->getValue(),
                'goles_90_min_total' => $sheet->getCell("H{$row}")->getValue(),
                'tarj_amarillas_prom' => $sheet->getCell("I{$row}")->getValue()
            ];
        }
        return $data;
    }

    private function parsePredictions($sheet) {
        $highestRow = $sheet->getHighestRow();
        $data = [];
        for ($row = 2; $row <= $highestRow; $row++) {
            $partido = $sheet->getCell("A{$row}")->getValue();
            if (!$partido) continue;

            $data[] = [
                'partido' => $partido,
                'fecha_partido' => $sheet->getCell("B{$row}")->getFormattedValue(),
                'local' => $sheet->getCell("C{$row}")->getValue(),
                'visitante' => $sheet->getCell("D{$row}")->getValue(),
                'zona_local' => $sheet->getCell("E{$row}")->getValue(),
                'zona_visitante' => $sheet->getCell("F{$row}")->getValue(),
                'ranking_fifa_local' => $sheet->getCell("G{$row}")->getValue(),
                'ranking_fifa_visitante' => $sheet->getCell("H{$row}")->getValue(),
                'puntos_fifa_local' => $sheet->getCell("I{$row}")->getValue(),
                'puntos_fifa_visitante' => $sheet->getCell("J{$row}")->getValue(),
                'primera_prediccion_polla' => $sheet->getCell("K{$row}")->getValue(),
                'segunda_prediccion_polla' => $sheet->getCell("L{$row}")->getValue(),
                'gol_res_1_local' => $sheet->getCell("M{$row}")->getValue(),
                'gol_res_1_vis_1' => $sheet->getCell("N{$row}")->getValue(),
                'gol_res_1_local_2' => $sheet->getCell("O{$row}")->getValue(),
                'gol_res_1_vis_2' => $sheet->getCell("P{$row}")->getValue(),
                'gol_res_1_local_3' => $sheet->getCell("Q{$row}")->getValue(),
                'gol_res_1_vis_3' => $sheet->getCell("R{$row}")->getValue(),
                'gol_res_2_local_1' => $sheet->getCell("S{$row}")->getValue(),
                'gol_res_2_vis_1' => $sheet->getCell("T{$row}")->getValue(),
                'gol_res_2_local_2' => $sheet->getCell("U{$row}")->getValue(),
                'gol_res_2_vis_2' => $sheet->getCell("V{$row}")->getValue(),
                'gol_res_2_local_3' => $sheet->getCell("W{$row}")->getValue(),
                'gol_res_2_vis_3' => $sheet->getCell("X{$row}")->getValue()
            ];
        }
        return $data;
    }
}
