/**
 * @author SNSukhanov
 */

$('#placeholder').highcharts('StockChart', {
        chart: {
//                zoomType:'x'
//            type: 'arearange'
        },
        credits:{
            enabled:false
        },
//        exporting:{
//            enabled:false
//        },
        legend:{
            enabled:false,
//            floating: true,
            align:'right',
            verticalAlign:'middle',
            layout: 'vertical'

        },

        colors: [
            '#2f7ed8',
            '#0d233a',
            '#8bbc21',
            '#910000',
            '#1aadce',
            '#492970',
            '#f28f43',
            '#77a1e5',
            '#c42525',
            '#a6c96a'
        ],
         rangeSelector: {
            enabled:false
        },
        navigator:{
        	enabled:false
        },
        scrollbar:{
        	enabled:false
        },

        yAxis: {
//            allowDecimals:false,
//            labels: {
//                formatter: function () {
//                    return (this.value > 0 ? '+' : '') + this.value;
//                }
//            },
            plotLines: [
                {
                    value: 0,
                    width: 1,
                    color: 'silver'
                }
            ]
        },

        plotOptions: {
           series: {
                dashStyle: 'Dash'
                ,compare: 'percent'

            }
        },

       tooltip: {
           pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2
           ,tooltipPoints: 1
        },

        series: data
    });
