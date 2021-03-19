<?php
# CLASE DE LA CONEXION
class Connection
{
    # FUNCION CONECTAR A LA BD
    public static function connect()
    {
        # INTENTO DE CONEXION A LA BD USANDO PDO
        try {
            $link = new PDO("mysql:host=localhost;dbname=tiendaderopa", "root", "");
            $link->exec('SET NAMES utf8');
            $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $link;
        } catch (Exception $e) {
            echo "Error en " . $e->getMessage() . $e->getLine();
        }
    }
}
