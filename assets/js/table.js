// prueba de examen "Test 1"

var urlJson = "http://localhost/workProject/demonXJS/libs/listGames/snes/snes.json";
var ajaxArray = Array();
var numPage = 1; // variable para mostrar el numero de la pagina actual.

$(function() {
    var forPage = 12; // varaible para mostrar un numero de elementos por pagina.
    var dataActual = 0; // variable de elemento actual.

    $("#btn_next").click(function() {
        mostrarDatos(dataActual, forPage, numPage+=1);
    });

    $("#btn_prev").click(function() {
        mostrarDatos(dataActual, forPage, numPage-=1);
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
            mostrarDatos(dataActual, forPage, 1);

            // regex(ajaxArray[7]);

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

function mostrarDatos(dataActual, limitPage, page) {
    var data = Array();
    
    for(dataActual; dataActual < limitPage; dataActual++) {
        data = ajaxArray[dataActual].split("::");
        $("#listingTable").append(data[0] + " >> " + data[1] + " >> " + data[2] + "</br>");
    }
    // al llegar al minimo.
    if (numPage < 1) {
        numPage = 1;
        page = 1;
    }
    // a llegar al maximo.
    if (numPage > ajaxArray.length) {
        numPage = ajaxArray.length;
        page = ajaxArray.length;        
    }

    $("#page").html(page);

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