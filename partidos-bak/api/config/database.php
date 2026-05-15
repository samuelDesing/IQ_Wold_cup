<?php
class Database {
    private static $instance = null;
    private $connection;
    
    // Configuración a ser provista por el usuario
    private $host = 'localhost';
    private $db   = 'predicciones_mundial';
    private $user = 'root';
    private $pass = '';
    private $charset = 'utf8mb4';

    private function __construct() {
        $dsn = "mysql:host={$this->host};dbname={$this->db};charset={$this->charset}";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->connection = new PDO($dsn, $this->user, $this->pass, $options);
        } catch (\PDOException $e) {
            // No se debe exponer el error detallado en producción, devolver JSON genérico
            header('HTTP/1.1 500 Internal Server Error');
            echo json_encode(["error" => "Error de conexion a la base de datos."]);
            exit;
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}
