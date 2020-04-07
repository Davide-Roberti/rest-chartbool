$(document).ready(function(){
    // http://157.230.17.132:4031/sales

    var oggettoIntermedio = {};

    $.ajax({
        url: 'http://157.230.17.132:4031/sales',
        method: 'GET',
        success: function(data){
            var infoVenditore = data;
            for (var i = 0; i < infoVenditore.length; i++) {
                var venditoreSingolo = infoVenditore[i];
                var dataVendite = venditoreSingolo.date;
                var datazione = moment(dataVendite, "DD-MM-YYYY").month();
                console.log(datazione);
            }

        },
        error: function(){

        }
    });
});
