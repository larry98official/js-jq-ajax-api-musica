$(document).ready(function() {

// HANDLEBARS
    var source = $("#card-template").html();
    var template = Handlebars.compile(source);

// Selezione genere musicale
    $("#scegli-genere").change(function () {
        var genereSelezionato = $("#scegli-genere").val().toLowerCase();
        // console.log(genereSelezionato);
        if (genereSelezionato == "") {
            $(".card").show();
        } else {
            $(".card").hide();
            $(".card").each(function () {
                var genereCard = $(this).data("genere").toLowerCase();
                if (genereSelezionato == genereCard) {
                $(this).show();
            } else {
                $(this).hide();
            }
            })
        }
    });


// Chiamata AJAX
    $.ajax({
        url: "https://flynn.boolean.careers/exercises/api/array/music",
        method: "GET",
        success: function (data) {
          assegnazioneAlbum(data, ".cards");
        },
        error: function () {
          alert("Qualcosa è andato storto!");
        }
    });



// FUNZIONI
    function assegnazioneAlbum(myData, placeToAppend) {
        var variabileEstrapolata = myData.response;
        for (var i = 0; i < variabileEstrapolata.length; i++) {
            var elementoVariabileEstrapolata = {
            image: variabileEstrapolata[i].poster,
            titolo: variabileEstrapolata[i].title,
            author: variabileEstrapolata[i].author,
            year: variabileEstrapolata[i].year,
            genere: variabileEstrapolata[i].genre
            };
        var templateCompiled = template(elementoVariabileEstrapolata);
        $(placeToAppend).append(templateCompiled);
        }
    }

});
