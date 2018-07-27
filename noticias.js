$(function () {
    $('#tbNoticias').dataTable({
        languaje: {
            url: "http://cdn.datatables.net/plug-ins/1.10.12/i18n/Spanish.json"
        },
        responsive: true,
        ajax: {
            url: "http://localhost:3002/noticias/v1/noticia/",
            dataSrc: function (datos) {            
                return datos.noticia;
            }

        },
        columns: [
            {
                data: "titulo"
            },
            {
                data: "autor"
            },
            {
                data: "nota"
            },
            {
                data: "fecha"
            },
            {
                data: "activo"
            },
            {
                data: "foto",
                "render": function (data) {
                    return '<img src="' + data + '"width="120%" />';
                }
            },
            {
                data: "user.name"
            },
            {
                data: function (row) {            
                    var res = `<button id="btnBorrar"
                    class="btn btn-danger btn-xs"
                    onclick="borrarNot('${row._id}')"> 
                    Eliminar
                    </button>`;
                    return res;
                }
            }
        ]
    });
});

function guardarN() {    
    var titulo = $('#txtTitulo').val();
    var autor = $('#txtAutor').val();
    var nota = $('#txtNota').val();
    var fecha = $('#txtFecha').val();
    var activo = $('#txtActivo').val();
    var foto = $('#txtFoto').val();
    var usuario = $('#txtUsuario').val();

    console.log(titulo);
    console.log(autor);
    console.log(nota);

    $.ajax({
        url: "http://localhost:3002/noticias/v1/noticia",
        type: "POST",
        data: {
            titulo: titulo,
            autor: autor,
            nota: nota,
            fecha: fecha,
            activo: activo,
            foto: foto,
            user: usuario
        }
    })
        .done(
            function (data) {            
                $('#tbNoticias').dataTable().api().ajax.reload();

                alert("Registro Exitoso");
            }
        )
        .fail(
            function (err) {
                alert(err);
            }
        );
}

function borrarNot(id) {
    $.ajax({
        url: "http://localhost:3002/noticias/v1/noticia/delete/" + id,
        type: "delete"
    })
        .done(
            function (data) {
                alert(data.msg);
                //REFRESCAR TABLA
                $('#tbNoticias').dataTable().api().ajax.reload(); 
                
            }
        )
        .fail({
            function(err) {
                alert(err);
            }
        })

}