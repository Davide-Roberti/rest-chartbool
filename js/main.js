$(document).ready(function(){

    var oggettoIntermedio = {};
    // console.log(oggettoIntermedio);

    var labelsMese = [];
    var valoriMese = [];

    // console.log(labelsMese);
    // console.log(valoriMese);

    var ctx = $('#grafico');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
                labels: labelsMese,
                datasets: [{
                label: 'Period 1',
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'blue',
                lineTension: 0,
                data: valoriMese
            }]
        }
    });

    $.ajax({
        url: 'http://157.230.17.132:4031/sales',
        method: 'GET',
        success: function(data){
            var infoVenditore = data;
            for (var i = 0; i < infoVenditore.length; i++) {
                var venditoreSingolo = infoVenditore[i];
                var dataVendite = venditoreSingolo.date;
                var datazioneMese = moment(dataVendite, "DD-MM-YYYY").format('MMMM');
                if (oggettoIntermedio[datazioneMese] === undefined) {
                    oggettoIntermedio[datazioneMese] = 0;
                }
                oggettoIntermedio[datazioneMese] += venditoreSingolo.amount;
            }
            for (var key in oggettoIntermedio) {
                labelsMese.push(key);
                valoriMese.push(oggettoIntermedio[key]);
            }
        },
        error: function(){
        }
    });
});
