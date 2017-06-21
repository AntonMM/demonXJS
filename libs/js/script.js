// Antonio M. Mérida
// mail: antonio_morero79@hotmail.com

// variables GLOBALES
var gamesArray = Array(); // declaracion del array que contienen los juegos.
var contPage = 30; // contenido de los datos para paginar, limitado a 30 datos por pagina.

$(function() {

var ajaxListGames = "http://localhost/workProject/demonXJS/libs/listGames/snes/snes.json"; // variable JSON de juegos Super Nintendo 

    $("#count").html("<img src='img/ajax-loader.gif'>"); // Mientras se carga
    // El método ajax recibe los datos
    $.ajax({
        url: ajaxListGames,
        type: "GET",
        dataType: "json",
        // Si se produce correctamente, funcionara la función
        success: function (resultsAjax) {
            // contador de juegos
            cont = resultsAjax.results.length;
            // mensaje del contenido de los juegos que existe en el JSON indicado.
            $("#count").html("<div class='alert alert-info' role='alert'><strong>Contador de juegos.</strong> Se han detectado <strong>" + 
                cont + "</strong> juegos de <strong>" + resultsAjax.consola + ".</strong>");
            
            var game; // variable de juegos
            // se llenan de datos el array
            for (var i=0; i < cont; i++) {
                gamesArray[i] = resultsAjax.results[i].titulosJuegos + "::" + 
                resultsAjax.results[i].publicaciones + "::" +
                resultsAjax.results[i].desarrolladores;                  
            };

            // creacion de  elmento de la tabla
            $("#listGames").append("<table class='table' id='tableGames'><thead><tr><th>#</th><th>Nombre del juego</th><th>Compañia</th></tr></thead><tbody>");
            var i = 0; // indice
            var game = Array(); // array para cada apartado de cada juego.
                        
            // while(i < contPage) {
            //    game = gamesArray[i].split("::"); // separacion del contenido.
            //    $("#tableGames").append("<tr><th scope='row'>"+(i+1)+"</th><td>"+game[0]+"</td><td>"+game[1]+"</td>");
            //    i++;
            //}

            paginator(gamesArray, 30);

            // finalizacion de elemento de la tabla.
            $("#listGames").append("</tbody></table>");
           
            

        },
        // Si la petición falla
        error: function (xhr, estado, error_producido) {
            console.log("Error producido: " + error_producido);
            console.log("Estado: " + estado);
        },
        //Tanto si falla como si funciona como sino funciona.
        complete: function (xhr, estado) {
            console.log("Peticion completa");
        }
    });


    $("#listGames").click(function () {
        // alert(document.getElementsByTagName("li")[1].innerHTML);
        alert(document.getElementById("page-1").innerHTML);
    });


});

function paginator(listGames, indexLimit) {
    // calculo de paginas que tendrá.
    var page = Math.round(listGames.length / contPage);
    var i = 0;
    while(i < indexLimit) {
        game = listGames[i].split("::"); // separacion del contenido.
        $("#tableGames").append("<tr><th scope='row'>"+(i+1)+"</th><td>"+game[0]+"</td><td>"+game[1]+"</td>");
        i++; 
    }
    // elementos HTML de paginacion.
    $("#listGames").append("<nav aria-label='...'><ul class='pagination pagination-lg'><li class='page-item disabled'><a class='page-link' id='page-1' href='#' tabindex='-1'>Previous</a></li><li class='page-item'><a class='page-link' href='#'>1</a></li><li class='page-item'><a class='page-link' href='#'>2</a></li><li class='page-item'><a class='page-link' href='#'>3</a></li><li class='page-item'><a class='page-link' href='#'>Next</a></li></ul></nav>");

}
