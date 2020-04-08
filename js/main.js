$(document).ready(function(){

    var oggettoIntermedio = {};

    $.ajax({
        url: 'http://157.230.17.132:4031/sales',
        method: 'GET',
        success: function(data){
            var valoriMese = generaIntroitoMensile(data);
            graficoLinea(valoriMese);
        },
        error: function(){
        }
    });

    function generaIntroitoMensile (valOggetto) {
        var infoVenditore = valOggetto;
        for (var i = 0; i < infoVenditore.length; i++) {
            var venditoreSingolo = infoVenditore[i];
            var dataVendite = venditoreSingolo.date;
            var datazioneMese = moment(dataVendite, "DD-MM-YYYY").clone().month();;
            if (oggettoIntermedio[datazioneMese] === undefined) {
                oggettoIntermedio[datazioneMese] = 0;
            }
            oggettoIntermedio[datazioneMese] += venditoreSingolo.amount;
        }
        var labelsMese = [];
        var valoriMese = [];
        for (var key in oggettoIntermedio) {
            labelsMese.push(key);
            valoriMese.push(oggettoIntermedio[key]);
        }
        return valoriMese
    }

    function graficoLinea (valMese) {
        var ctx = $('#grafico-linea');
        var chart = new Chart(ctx, {
            type: 'line',
            data: {
                    labels: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
                    datasets: [{
                    label: 'Period 1',
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'blue',
                    lineTension: 0,
                    data: valMese
                }]
            }
        });
    }
});
