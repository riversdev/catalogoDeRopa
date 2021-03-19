<?php
# REQUERIR UNO DE LA CONEXION
require_once "connectionModel.php";

# CLASE DEL MODELO
class CatalogModel
{
    # FUNCIONES DE ACCIONES CRUD CON USO DE LA CONEXION Y RETORNO AL CONTROLADOR
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
    public static function editarPrenda($idPrenda, $nombrePrenda, $marcaPrenda, $precioPrenda)
    {
        $SQL =
            "UPDATE catalogo SET
                nombrePrenda='$nombrePrenda',
                marcaPrenda='$marcaPrenda',
                precioPrenda='$precioPrenda'
            WHERE idPrenda = $idPrenda";
        $stmt = Connection::connect()->prepare($SQL);

        try {
            if ($stmt->execute()) {
                return ['success', 'Prenda editada !'];
            } else {
                return ['error', 'Imposible editar prenda !'];
            }
        } catch (Exception $e) {
            return ['error', 'Imposible editar prenda !' . $e];
        }
        $stmt = null;
    }
    public static function eliminarPrenda($idPrenda)
    {
        $SQL = "DELETE FROM catalogo WHERE idPrenda = $idPrenda";
        $stmt = Connection::connect()->prepare($SQL);

        try {
            if ($stmt->execute()) {
                return ['success', 'Prenda eliminada !'];
            } else {
                return ['error', 'Imposible eliminar prenda !'];
            }
        } catch (Exception $e) {
            return ['error', 'Imposible eliminar prenda !' . $e];
        }
        $stmt = null;
    }
}
