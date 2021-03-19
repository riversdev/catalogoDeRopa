// VARIABLE PARA EL ARBOL DEL CATALOGO
let catalogo = null;

// EJECUCION AL CARGAR EL DOM
document.addEventListener('DOMContentLoaded', () => {
    // PREPARACION DE LA TABLA
    leerCatalogo().then(() => { generarTabla() })

    // LISTENER PARA EL SUBMIT DEL FORMULARIO
    document.getElementById('formPrenda').addEventListener('submit', (event) => {
        event.preventDefault()
        document.getElementById('txtId').value == '' ? enviarPrenda(recolectarDatosGUI(), 'agregar') : enviarPrenda(recolectarDatosGUI(), 'editar')
    })

    // ELIMINAR ID OCULTO CUANDO SE AGREGA
    document.getElementById('btnModalPrendas').addEventListener('click', () => {
        document.getElementById('formPrenda').reset()
        document.getElementById('txtId').value = ''
    })
})

// PETICION PARA OBTENER EL CATALOGO
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

// PETICION PARA EL RESTO DE ACCIONES CRUD
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
            respuesta = res.data
            if (respuesta[0] == 'success') {
                leerCatalogo().then(() => {
                    generarTabla()
                    document.getElementById('formPrenda').reset()
                    document.getElementById('txtId').value = ''
                    alertify.success(respuesta[1])
                })
            } else if (respuesta[0] == 'error') {
                alertify.error(respuesta[1])
            } else {
                console.warn('Tipo de respuesta no definido. ' + respuesta);
            }
        } catch (error) {
            console.error(error);
        }
    } else if (accion == 'editar') {
        try {
            let res = await axios('controllers/catalogController.php', {
                method: 'POST',
                data: {
                    tipoPeticion: 'editarPrenda',
                    idPrenda: prenda['idPrenda'],
                    nombrePrenda: prenda['nombrePrenda'],
                    marcaPrenda: prenda['marcaPrenda'],
                    precioPrenda: prenda['precioPrenda']
                }
            })
            respuesta = res.data
            if (respuesta[0] == 'success') {
                leerCatalogo().then(() => {
                    generarTabla()
                    alertify.success(respuesta[1])
                })
            } else if (respuesta[0] == 'error') {
                alertify.error(respuesta[1])
            } else {
                console.warn('Tipo de respuesta no definido. ' + respuesta);
            }
        } catch (error) {
            console.error(error);
        }
    } else if (accion == 'eliminar') {
        try {
            let res = await axios('controllers/catalogController.php', {
                method: 'POST',
                data: {
                    tipoPeticion: 'eliminarPrenda',
                    idPrenda: prenda
                }
            })
            respuesta = res.data
            if (respuesta[0] == 'success') {
                leerCatalogo().then(() => {
                    generarTabla()
                    alertify.success(respuesta[1])
                })
            } else if (respuesta[0] == 'error') {
                alertify.error(respuesta[1])
            } else {
                console.warn('Tipo de respuesta no definido. ' + respuesta);
            }
        } catch (error) {
            console.error(error);
        }
    }
}

// GENERACION DE TABLA A PARTIT DEL CATALOGO OBTENIDO
generarTabla = () => {
    let table = document.createElement('table'),
        head = document.createElement('thead'),
        body = document.createElement('tbody'),
        tr = document.createElement('tr'),
        th = document.createElement('th')

    table.id = 'tablaPrendas'
    table.className += 'table table-hover'
    table.style.width = '100%'
    head.style.backgroundColor = '#F7F7F9'

    th.scope = 'col'
    th.appendChild(document.createTextNode('#'))
    tr.append(th)
    th = document.createElement('th')
    th.scope = 'col'
    th.appendChild(document.createTextNode('Nombre'))
    tr.append(th)
    th = document.createElement('th')
    th.scope = 'col'
    th.appendChild(document.createTextNode('Marca'))
    tr.append(th)
    th = document.createElement('th')
    th.scope = 'col'
    th.appendChild(document.createTextNode('Precio'))
    tr.append(th)
    th = document.createElement('th')
    th.scope = 'col'
    th.className = 'text-center'
    th.appendChild(document.createTextNode('Acciones'))
    tr.append(th)
    head.append(tr)

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
        td.append(document.createTextNode('$' + prenda['precioPrenda']))
        tr.append(td)
        td = document.createElement('td')
        td.className = 'd-flex justify-content-around'
        button = document.createElement('button')
        button.className = 'btn btn-sm btn-outline-warning btnEdit'
        button.id = 'btnEdit' + prenda['idPrenda']
        button.append(document.createTextNode('Editar'))
        td.append(button)
        button = document.createElement('button')
        button.className = 'btn btn-sm btn-outline-danger btnDelete'
        button.id = 'btnDelete' + prenda['idPrenda']
        button.append(document.createTextNode('Eliminar'))
        td.append(button)
        tr.append(td)
        body.append(tr)
    })

    table.append(head);
    table.append(body);
    document.getElementById('contenedorTablaPrendas').innerHTML = ''
    document.getElementById('contenedorTablaPrendas').append(table);
    listenersDeAcciones()
    aplicarDataTable()
}

// RECOLECCION DE LOS DATOS DE LA GUI PARA AGREGAR Y EDITAR
recolectarDatosGUI = () => {
    return {
        idPrenda: document.getElementById('txtId').value,
        nombrePrenda: document.getElementById('txtNombre').value,
        marcaPrenda: document.getElementById('txtMarca').value,
        precioPrenda: document.getElementById('txtPrecio').value
    }
}

// ESCUCHADORES DE LOS BOTONES DE ACCIONES DE CADA REGISTRO
listenersDeAcciones = () => {
    let elementosEditar = document.getElementsByClassName('btnEdit'),
        elementosEliminar = document.getElementsByClassName('btnDelete')

    for (let i = 0; i < elementosEditar.length; i++) {
        document.getElementById(elementosEditar[i].id).addEventListener('click', function () {
            document.getElementById('txtId').value = this.parentElement.parentElement.children[0].innerHTML
            document.getElementById('txtNombre').value = this.parentElement.parentElement.children[1].innerHTML
            document.getElementById('txtMarca').value = this.parentElement.parentElement.children[2].innerHTML
            document.getElementById('txtPrecio').value = (this.parentElement.parentElement.children[3].innerHTML).substr(1)
            new bootstrap.Modal(document.getElementById('modalPrendas')).show()
        })
    }

    for (let i = 0; i < elementosEliminar.length; i++) {
        document.getElementById(elementosEliminar[i].id).addEventListener('click', function () {
            idPrenda = this.parentElement.parentElement.children[0].innerHTML
            alertify.confirm(
                'Eliminando pregunta...',
                'Seguro de quere eliminar la prenda "' + this.parentElement.parentElement.children[1].innerHTML + '" ?',
                function () {
                    enviarPrenda(idPrenda, 'eliminar')
                },
                function () {
                    alertify.error('Cancelado')
                }
            ).set('labels', { ok: 'SI', cancel: 'Cancelar' });
        })
    }
}

// ESTILOS Y FUNCIONES DATATABLE
aplicarDataTable = () => {
    $('#tablaPrendas').DataTable({
        scrollX: true,
        'lengthMenu': [
            [5, 20, 40, -1],
            [5, 20, 40, 'Todos']
        ],
        'order': [
            [0, 'asc']
        ],
        language: {
            sProcessing: 'Procesando...',
            sLengthMenu: 'Mostrar _MENU_ registros',
            sZeroRecords: 'No se encontraron resultados',
            sEmptyTable: 'Ningún dato disponible en esta tabla',
            sInfo: 'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
            sInfoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
            sInfoFiltered: '(filtrado de un total de _MAX_ registros)',
            sInfoPostFix: '',
            sSearch: 'Buscar:',
            sUrl: '',
            sInfoThousands: ',',
            sLoadingRecords: 'Cargando...',
            oPaginate: {
                sFirst: 'Primero',
                sLast: 'Último',
                sNext: 'Siguiente',
                sPrevious: 'Anterior'
            },
            aria: {
                SortAscending: ': Activar para ordenar la columna de manera ascendente',
                SortDescending: ': Activar para ordenar la columna de manera descendente'
            }
        }
    });
}