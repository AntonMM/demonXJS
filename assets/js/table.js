// Script pagination with ajax.
// version 0.30

var urlJson = "http://localhost/workProject/demonXJS/libs/listGames/snes/snes.json";
var ajaxArray = Array();
var numPage = 1; // variable para mostrar el numero de la pagina actual.
var forPage = 22; // variable para mostrar un numero de elementos por pagina.

$(function() {
    // click event.
    $("#btn_next").click(function() {
        if (numPage < numPages(ajaxArray.length)) {
            mostrarDatos(forPage, numPage+=1);
            $("#page").html(numPage);
        }
    });

    $("#btn_prev").click(function() {
        if (numPage > 1) {
            mostrarDatos(forPage, numPage-=1);
            $("#page").html(numPage);
        }
    }); 

    $.ajax({
        url: urlJson,
        type: "GET", 
        dataType: "json",
        success: function (resultAjax) {
            for(var i=0; i < resultAjax.results.length; i++) {
                ajaxArray[i] = resultAjax.results[i].titulosJuegos + "::" + 
                resultAjax.results[i].publicaciones + "::" +
                resultAjax.results[i].desarrolladores;
            }
            // mostará los datos del array, desde el comienzo en "1".
            mostrarDatos(forPage, 1);
            // mostrar numero de la primera pagina.
            $("#page").html(numPage);

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
})

function mostrarDatos(forPage, page) {
    var data = Array();
    var limitForPage = page * forPage; // limite en cada pagina
    var indexElement = limitForPage - forPage; // indice en cada pagina 
    // clear HTML.
    $("#listingTable").html("");
    for(indexElement; indexElement <= limitForPage; indexElement++) {
            if (indexElement < ajaxArray.length) {
                data = ajaxArray[indexElement].split("::");
                $("#listingTable").append(data[0] + " >> " + data[1] + " >> " + data[2] + "</br>");
            }
    }
}

// funcion numero de paginas
function numPages(num) {
    return Math.ceil(num / forPage);
}

// expresion regular para sacar fecha tipo 1996, etc.
function regex(expre) {
    var regex = /.(\d{4})/ig
    var result = regex.exec(expre);
    alert(result[0]);
}