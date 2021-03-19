<?php
# REQUERIR UNO DEL MODELO
require_once "../models/catalogModel.php";

# LECTURA DE LOS DATOS DE LA PETICION AXIOS
$data = json_decode(file_get_contents('php://input'), true);
$tipoPeticion = $data["tipoPeticion"];

# RECEPCION Y ENVIO DE PARAMETROS DEL FRONTEND AL MODELO Y DEVOLUCION DE RESPUESTA
if ($tipoPeticion == 'leerCatalogo') {
    $res = CatalogModel::obtenerListado();
    echo json_encode($res);
} elseif ($tipoPeticion == 'agregarPrenda') {
    $nombrePrenda = $data['nombrePrenda'];
    $marcaPrenda = $data['marcaPrenda'];
    $precioPrenda = $data['precioPrenda'];
    $res = CatalogModel::agregarPrenda($nombrePrenda, $marcaPrenda, $precioPrenda);
    echo json_encode($res);
} elseif ($tipoPeticion == 'editarPrenda') {
    $idPrenda = $data['idPrenda'];
    $nombrePrenda = $data['nombrePrenda'];
    $marcaPrenda = $data['marcaPrenda'];
    $precioPrenda = $data['precioPrenda'];
    $res = CatalogModel::editarPrenda($idPrenda, $nombrePrenda, $marcaPrenda, $precioPrenda);
    echo json_encode($res);
} elseif ($tipoPeticion == 'eliminarPrenda') {
    $idPrenda = $data['idPrenda'];
    $res = CatalogModel::eliminarPrenda($idPrenda);
    echo json_encode($res);
}
