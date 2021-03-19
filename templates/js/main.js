let catalogo = null;

document.addEventListener('DOMContentLoaded', () => {
    // LEER CATALOGO
    leerCatalogo().then(() => { generarTabla() })

    document.getElementById('formPrenda').addEventListener('submit', (event) => {
        event.preventDefault()
        enviarPrenda(recolectarDatosGUI(), 'agregar').then((res) => {
            alert(res)
            leerCatalogo().then(() => { generarTabla() })
        })
    })

    var list = document.getElementsByClassName('btnEdit');
    console.log(list.length);

    document.getElementsByClassName('btnEdit')[4]
})

async function leerCatalogo() {
    try {
        let res = await axios('controllers/catalogController.php', {
            method: 'POST',
            data: {
                tipoPeticion: 'leerCatalogo'
            }
        })
        catalogo = res.data
    } catch (error) {
        console.error(error);
    }
}

generarTabla = () => {
    document.getElementById('bodyTablaPrendas').innerHTML = ''
    catalogo.forEach(prenda => {
        tr = document.createElement('tr')
        th = document.createElement('th')
        th.scope = 'row'
        th.append(document.createTextNode(prenda['idPrenda']))
        tr.append(th)
        td = document.createElement('td')
        td.append(document.createTextNode(prenda['nombrePrenda']))
        tr.append(td)
        td = document.createElement('td')
        td.append(document.createTextNode(prenda['marcaPrenda']))
        tr.append(td)
        td = document.createElement('td')
        td.append(document.createTextNode(prenda['precioPrenda']))
        tr.append(td)
        td = document.createElement('td')
        button = document.createElement('button')
        button.className = 'btn btn-sm btn-outline-warning btnEdit'
        button.id = 'btnEdit' + prenda['idPrenda']
        button.append(document.createTextNode('Editar'))
        td.append(button)
        button = document.createElement('button')
        button.className = 'btn btn-sm btn-outline-danger mx-2 btnDelete'
        button.id = 'btnDelete' + prenda['idPrenda']
        button.append(document.createTextNode('Eliminar'))
        td.append(button)
        tr.append(td)
        document.getElementById('bodyTablaPrendas').append(tr)
    })
}

recolectarDatosGUI = () => {
    return {
        nombrePrenda: document.getElementById('txtNombre').value,
        marcaPrenda: document.getElementById('txtMarca').value,
        precioPrenda: document.getElementById('txtPrecio').value
    }
}

async function enviarPrenda(prenda, accion) {
    if (accion == 'agregar') {
        try {
            let res = await axios('controllers/catalogController.php', {
                method: 'POST',
                data: {
                    tipoPeticion: 'agregarPrenda',
                    nombrePrenda: prenda['nombrePrenda'],
                    marcaPrenda: prenda['marcaPrenda'],
                    precioPrenda: prenda['precioPrenda']
                }
            })
            return res.data
        } catch (error) {
            console.error(error);
        }
    }
}

// aplicarDataTable = () => {
//     let tabla = $('#tablaPrendas').DataTable({
//         "lengthMenu": [
//             [5, 20, 40, -1],
//             [5, 20, 40, "Todos"]
//         ],
//         "order": [
//             [0, "asc"]
//         ],
//         language: {
//             sProcessing: "Procesando...",
//             sLengthMenu: "Mostrar _MENU_ registros",
//             sZeroRecords: "No se encontraron resultados",
//             sEmptyTable: "Ningún dato disponible en esta tabla",
//             sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
//             sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
//             sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
//             sInfoPostFix: "",
//             sSearch: "Buscar:",
//             sUrl: "",
//             sInfoThousands: ",",
//             sLoadingRecords: "Cargando...",
//             oPaginate: {
//                 sFirst: "Primero",
//                 sLast: "Último",
//                 sNext: "Siguiente",
//                 sPrevious: "Anterior"
//             },
//             aria: {
//                 SortAscending: ": Activar para ordenar la columna de manera ascendente",
//                 SortDescending: ": Activar para ordenar la columna de manera descendente"
//             }
//         }
//     });
// }