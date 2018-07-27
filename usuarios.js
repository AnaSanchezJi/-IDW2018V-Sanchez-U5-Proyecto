$(function () {
    $('#tbUsuarios').DataTable({
        language: {
            //url:"http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ de _END_ de _TOTAL_ ",
            "infoEmpty": "Mostrando 0 de 0 de 0 ",
            "infoFiltered": "(filtered from _MAX_ total entries)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ ",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontró",
            "paginate": {
                "first": "<<",
                "last": ">>",
                "next": "<",
                "previous": ">"
            },
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            }
        },
        responsive: true,
        ajax: {
            url: "http://localhost:3002/usuarios/v1/usuario/",
            dataSrc: function (datos) {
                return datos.users;
            }
        },
        columns: [
            {
                data: "name"
            },
            {
                data: "email"
            },
            {
                data: function (row) {
                    var res = `<button id="btnBorrar"
                    class="btn btn-danger btn-xs"
                    onclick="borrar('${row._id}')">
                    Eliminar</button>`;
                    return res;

                }
            }
        ]

    });

});

function guardar() {
    //var name = document.getElementById("txtNombre").value; --JS
    var name = $('#txtNombre').val(); //JQuery
    var email = $('#txtEmail').val();
    var password = $('#txtPassword').val();
    console.log(name);
    console.log(email);
    console.log(password);
    //$('#txtNombre').val('Plop'); --enviar informacion 
    //alert(name);
    $.ajax(
        {
            url: "http://localhost:3002/usuarios/v1/usuario/",
            type: "POST",
            data: {
                name: name,
                email: email,
                password: password
            }
        }
    )
        .done(
            function (data) {
                alert(JSON.stringify(data));
                $('#txtNombre').val(''); //JQuery
                $('#txtEmail').val('');
                $('#txtPassword').val('');
                //refrescar tabla
                $('#tbUsuarios').dataTable().api().ajax.reload();
            }
        )//ejecuta codigo 200
        .fail(
            function (err) {
                alert(err);
            }
        );//ejecuta codigo 400
}

function borrar(id) {
    $.ajax({
        url: "http://localhost:3002/usuarios/v1/usuario/delete/" + id,
        type: "DELETE"
    })
        .done(
            function (data) {
                alert(data.msg);
                //refrescar tabla
                $('#tbUsuarios').dataTable().api().ajax.reload();
            }
        )
        .fail(
            function (err) {
                alert(err);
            }
        )
}