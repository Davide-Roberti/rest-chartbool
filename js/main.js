$(document).ready(function(){

    var oggettoIntermedio = {};
    var oggettoIntermedioVenditori = {};


    $.ajax({
        url: 'http://157.230.17.132:4031/sales',
        method: 'GET',
        success: function(data){
            var valoriMese = generaIntroitoMensile(data);
            graficoLinea(valoriMese);
            var datiVenditaSalesmen = generaDatiSalesmen(data);
            graficoTorta(datiVenditaSalesmen.labelsVenditore, datiVenditaSalesmen.valoriComplessiviVenditore);

            $('#inserimento-dati').click(function(){
                var salesmanInserito = $('#seleziona-salesman').val();
                // console.log(salesmanInserito);
                var dataInserita = moment($("#inserimento-data").val()).format('DD-MM-YYYY');
                // console.log(dataInserita);
                var amountInserito = parseInt($('#ammontare-inserito').val());
                // console.log(amountInserito);
                inserimentoNuoviDati(salesmanInserito, amountInserito, dataInserita);
            });
        },
        error: function(){
        }
    });


    function inserimentoNuoviDati (saleInserito, amInserito, dtInserita) {
        $.ajax({
            url: 'http://157.230.17.132:4031/sales',
            method: 'POST',
            data: {
                salesman: saleInserito,
                amount: amInserito,
                date: dtInserita
            },
            success: function(){
            },
            error: function(){

            }
        });
    }

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

    function generaDatiSalesmen (valOggetto) {
        var valoreVenditore = valOggetto;
        for (var i = 0; i < valoreVenditore.length; i++) {
            var valoreVenditoreSingolo = valoreVenditore[i];
            var venditoreSingolo = valoreVenditoreSingolo.salesman;
            if (oggettoIntermedioVenditori[venditoreSingolo] === undefined) {
                oggettoIntermedioVenditori[venditoreSingolo] = 0;
            }
            oggettoIntermedioVenditori[venditoreSingolo] += valoreVenditoreSingolo.amount;
        }
        var labelsVenditore = [];
        var valoriComplessiviVenditore = [];
        for (var key in oggettoIntermedioVenditori) {
            labelsVenditore.push(key);
            valoriComplessiviVenditore.push(oggettoIntermedioVenditori[key]);
        }
        return {
            labelsVenditore: labelsVenditore,
            valoriComplessiviVenditore: valoriComplessiviVenditore
        }
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

    function graficoTorta (nomiVenditori, valVenditore) {
        var ctx = $('#grafico-torta');
        var chartTwo = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: nomiVenditori,
                datasets: [{
                    label: 'Vendite per venditore',
                    data: valVenditore,
                    backgroundColor: ['lightblue', 'green', 'pink', 'yellow']
                }]
            }
        });
    }
});
