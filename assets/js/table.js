// Version Testing
// Antonio M. Mérida
// 2017

var current_page = 0;
var records_per_page = 2;

// addEventListener in HTML
document.getElementById("btn_next").addEventListener('click', nextPage, false); // next page
document.getElementById("btn_prev").addEventListener('click', prevPage, false); // return page

// variable example
var objJson = [
    {
        "titulosJuegos": "2020 Super Baseball",
        // "publicaciones": "SNK",
        "desarrolladores": "1993"
    },
    {
        "titulosJuegos": "3 Ninjas Kick Back",
        // "publicaciones": "Sony ImageSoft",
        "desarrolladores": "1994"
    },
    {
        "titulosJuegos": "3x3 Eyes - Juuma Houkan",
        // "publicaciones": "Banpresto",
        "desarrolladores": "1995"
    },
    {
        "titulosJuegos": "3x3 Eyes - Seima Kourinden",
        // "publicaciones": "Yutaka",
        "desarrolladores": "1995"
    },
    {
        "titulosJuegos": "'96 Zenkoku Koukou Soccer Senshuken",
        // "publicaciones": "Mahou",
        "desarrolladores": "22 de marzo de 1996 (Sólo Japón)"
    },
    {
        "titulosJuegos": "7th Saga",
        // "publicaciones": "Enix",
        "desarrolladores": "Septiembre de 1993"
    },
    {
        "titulosJuegos": "90 Minutes - European Prime Goal",
       // "publicaciones": "Namco",
        "desarrolladores": "1995 (Sólo Europa)"
    },
    {
        "titulosJuegos": "Aaahh!!! Real Monsters",
        // "publicaciones": "Majesco",
        "desarrolladores": "Noviembre de 1995"
    }
]; // Can be obtained from another source, such as your objJson variable

function prevPage()
{
    if (current_page > 1) {
        current_page--;
        if (current_page == document.getElementById("page").innerText) {
            current_page--;
        }
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        if (current_page == document.getElementById("page").innerText) {
            current_page++;
        }
        changePage(current_page);

    }
}
    
function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var listing_table = document.getElementById("listingTable");
    var page_span = document.getElementById("page");
 
    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    listing_table.innerHTML = "";

    for (var i = (page-1) * records_per_page; i < (page * records_per_page); i++) {
        listing_table.innerHTML += objJson[i].titulosJuegos + "<br>";        
    }


    page_span.innerHTML = page;

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

function numPages()
{
    return Math.ceil(objJson.length / records_per_page);
}

window.onload = function() {
    changePage(1);
};