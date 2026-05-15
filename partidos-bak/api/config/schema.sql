CREATE DATABASE IF NOT EXISTS predicciones_mundial CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE predicciones_mundial;

CREATE TABLE IF NOT EXISTS estadisticas_jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(100) NOT NULL UNIQUE,
    portero VARCHAR(100),
    defensa VARCHAR(100),
    volante VARCHAR(100),
    extremo VARCHAR(100),
    delantero VARCHAR(100),
    goles_90_min_delanteros DECIMAL(5,2),
    goles_90_min_total DECIMAL(5,2),
    tarj_amarillas_prom DECIMAL(5,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS predicciones_partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partido INT NOT NULL UNIQUE,
    fecha_partido VARCHAR(50),
    local VARCHAR(100),
    visitante VARCHAR(100),
    zona_local VARCHAR(50),
    zona_visitante VARCHAR(50),
    ranking_fifa_local INT,
    ranking_fifa_visitante INT,
    puntos_fifa_local DECIMAL(10,2),
    puntos_fifa_visitante DECIMAL(10,2),
    primera_prediccion_polla VARCHAR(100),
    segunda_prediccion_polla VARCHAR(100),
    gol_res_1_local DECIMAL(5,2),
    gol_res_1_vis_1 DECIMAL(5,2),
    gol_res_1_local_2 DECIMAL(5,2),
    gol_res_1_vis_2 DECIMAL(5,2),
    gol_res_1_local_3 DECIMAL(5,2),
    gol_res_1_vis_3 DECIMAL(5,2),
    gol_res_2_local_1 DECIMAL(5,2),
    gol_res_2_vis_1 DECIMAL(5,2),
    gol_res_2_local_2 DECIMAL(5,2),
    gol_res_2_vis_2 DECIMAL(5,2),
    gol_res_2_local_3 DECIMAL(5,2),
    gol_res_2_vis_3 DECIMAL(5,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
