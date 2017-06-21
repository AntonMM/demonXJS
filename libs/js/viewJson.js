// Antonio M. Mérida
// mail: antonio_morero79@hotmail.com

var urlJson = "http://localhost/workProject/demonXJS/libs/listGames/snes/snes.json";
var ajaxArray = Array(); // variable array.
var cont; // contador de los elementos de JSON.

var current_page = 0;
var records_per_page = 8;

$(function () {
	changePage(1);
	
});

function changePage(page) {
	$("#btn_next").click(function(){
	    if (current_page < numPages()) {
	        current_page++;

	        changePage(current_page);
	    }
	});

	$("#btn_prev").click(function(){
	    if (current_page > 1) {
	        current_page--;
	        changePage(current_page);
	    }
	});

	$.ajax({
		url: urlJson,
        type: "GET",
        dataType: "json",
        success: function (resultAjax) {
        	// contará los datos de objeto JSON.
        	cont = resultAjax.results.length;
        	// $("#listingTable").html("<strong>" + cont + "</strong>");        	
        	// Llenar array de datos del JSON
        	for (var i=0; i < cont; i++) {
        		ajaxArray[i] = resultAjax.results[i].titulosJuegos + "::" + resultAjax.results[i].publicaciones + 
        		"::" + resultAjax.results[i].desarrolladores;
        		//$("#listingTable").html(ajaxArray[i]);
        	}
        	// creación de table
        	// $("#listingTable").append("<table class='table'><thead><tr><th>#</th><th>Nombre del juego</th><th>Compañia</th></tr></thead><tbody>");
        	// array para contenido individual de los datos
        	//var datAjax = Array(); // array para cada apartado separado por "::".
        	//var i = 0; // indice
        	// mostrar cada elemento en la tabla
        	//while(i < cont) {
        	//	datAjax = ajaxArray[i].split("::");
        	//	$("#listingTable").append("<tr><th scope='row'>"+(i+1)+"</th><td>"+datAjax[0]+"</td><td>"+datAjax[1]+"</td>");
        	//	i++
        	//}

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

    // variable para pintar elementos.
    paintData(page, ajaxArray);

    $("#listingTable").append(ajaxArray[1]);

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    $("#page").html(page);

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages() {
    return Math.ceil(cont / records_per_page);
}

function paintData(page, list) {
    // $("#listingTable").html("");
	for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
		alert(list[i]);
		if(list[i] != null) {
    		$("#listingTable").append(list[i] + "<br>");
		}
	}
}