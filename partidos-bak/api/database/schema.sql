CREATE DATABASE IF NOT EXISTS iq_world_cup CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE iq_world_cup;

-- Tabla para usuarios (Administradores)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar usuario admin por defecto (pass: admin123)
INSERT IGNORE INTO users (username, password_hash) VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Tabla de Estadísticas de Jugadores (Hoja 1)
CREATE TABLE IF NOT EXISTS player_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pais VARCHAR(100) NOT NULL UNIQUE,
    portero DECIMAL(5,2),
    defensa DECIMAL(5,2),
    volante DECIMAL(5,2),
    extremo DECIMAL(5,2),
    delantero DECIMAL(5,2),
    goles_90_delanteros DECIMAL(5,2),
    goles_90_total DECIMAL(5,2),
    tarj_amarillas_prom DECIMAL(5,2),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Predicciones y Partidos (Hoja 2)
CREATE TABLE IF NOT EXISTS matches_predictions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partido_num INT NOT NULL UNIQUE,
    fecha_partido VARCHAR(50),
    local_team VARCHAR(100),
    visitante_team VARCHAR(100),
    zona_local VARCHAR(50),
    zona_visitante VARCHAR(50),
    ranking_fifa_local INT,
    ranking_fifa_visitante INT,
    puntos_fifa_local DECIMAL(8,2),
    puntos_fifa_visitante DECIMAL(8,2),
    primera_prediccion_polla VARCHAR(20),
    segunda_prediccion_polla VARCHAR(20),
    gol_res_1_local INT,
    gol_res_1_vis_1 INT,
    gol_res_1_local_2 INT,
    gol_res_1_vis_2 INT,
    gol_res_1_local_3 INT,
    gol_res_1_vis_3 INT,
    gol_res_2_local_1 INT,
    gol_res_2_vis_1 INT,
    gol_res_2_local_2 INT,
    gol_res_2_vis_2 INT,
    gol_res_2_local_3 INT,
    gol_res_2_vis_3 INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
