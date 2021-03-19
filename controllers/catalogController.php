<?php
require_once "../models/catalogModel.php";

$data = json_decode(file_get_contents('php://input'), true);
$tipoPeticion = $data["tipoPeticion"];

if ($tipoPeticion == 'leerCatalogo') {
    $res = CatalogModel::obtenerListado();
    echo json_encode($res);
} elseif ($tipoPeticion == 'agregarPrenda') {
    $nombrePrenda = $data['nombrePrenda'];
    $marcaPrenda = $data['marcaPrenda'];
    $precioPrenda = $data['precioPrenda'];

    $res = CatalogModel::agregarPrenda($nombrePrenda, $marcaPrenda, $precioPrenda);
    echo json_encode($res);
}
