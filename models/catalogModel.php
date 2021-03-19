<?php
require_once "connectionModel.php";

class CatalogModel
{
    public static function obtenerListado()
    {
        $SQL = "SELECT * FROM catalogo";
        $stmt = Connection::connect()->prepare($SQL);

        try {
            if ($stmt->execute()) {
                return $stmt->fetchAll();
            } else {
                return ['error', 'Imposible leer catálogo !'];
            }
        } catch (Exception $e) {
            return ["error", "Imposible leer catálogo !" . $e];
        }
        $stmt = null;
    }
    public static function agregarPrenda($nombrePrenda, $marcaPrenda, $precioPrenda)
    {
        $SQL = "INSERT INTO catalogo (nombrePrenda, marcaPrenda, precioPrenda)
                VALUES ('$nombrePrenda', '$marcaPrenda', '$precioPrenda')";
        $stmt = Connection::connect()->prepare($SQL);

        try {
            if ($stmt->execute()) {
                return ['success', 'Prenda guardada !'];
            } else {
                return ['error', 'Imposible guardar prenda !'];
            }
        } catch (Exception $e) {
            return ['error', 'Imposible guardar prenda !' . $e];
        }
        $stmt = null;
    }
}
