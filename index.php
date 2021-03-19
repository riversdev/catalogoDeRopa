<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Catálgo de ropa</title>
  <!-- Bootstrap 5 beta -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
  <!-- JQuery -->
  <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
  <!-- Datatables -->
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css">
  <script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
  <!-- Axios -->
  <script src="static\axios\axios.js"></script>
  <!-- Main JS -->
  <script src="templates\js\main.js"></script>
</head>

<body>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center my-3">
        <h4>Tienda de ropa</h4>
      </div>
      <div class="col-4">
        <form id="formPrenda" class="row g-3 card p-3 bg-light">
          <div class="col-md-12">
            <label for="txtNombre" class="form-label">Nombre</label>
            <input type="text" class="form-control" id="txtNombre" value="" required />
          </div>
          <div class="col-md-12">
            <label for="txtMarca" class="form-label">Marca</label>
            <input type="text" class="form-control" id="txtMarca" value="" required />
          </div>
          <div class="col-md-12">
            <label for="txtPrecio" class="form-label">Precio</label>
            <input type="number" class="form-control" id="txtPrecio" value="" required />
          </div>
          <div class="col-12 d-flex justify-content-end">
            <button class="btn btn-outline-success" type="submit">Enviar</button>
          </div>
        </form>
      </div>
      <div class="col-8">
        <table id="tablaPrendas" class="table" style="width: 100%;">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Marca</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody id="bodyTablaPrendas"></tbody>
        </table>
      </div>
    </div>
  </div>
</body>

</html>