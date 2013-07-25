/**
 * @author SNSukhanov
 */
var graphData = null;

// LOAD DATA FROM SERVER: http://www.highcharts.com/component/content/article/2-news/48-loading-millions-of-points-in-highcharts

function onJsGraphDataLoad(series) {
//    stopAnimation();
    graphData = series;
//    var dataLength = 100;
    var dataLength = graphData.length - 1;

    var data = [];

    var dataHR = [];
    var dataDS = [];
    var dataLS = [];
    var dataStp = [];
    var dataHyd = [];
    var dataStressGr = [];
    var dataStressYl = [];
    var dataStressRd = [];
    var calEvent = [];

    var prevStress =0;
    var currentDate = new Date().getTime();
    var prevDay = currentDate - 864000000;
    for (var i = 0; i <= dataLength; ++i) {
        var measurement = graphData[i];
        if (measurement.time<prevDay) continue;
//        dataHR.push(measurement.heartRate);
        dataHR.push([measurement.time, measurement.heartRate]);
//        dataStp.push(measurement.steps);
        dataStp.push([measurement.time, measurement.steps]);
        dataDS.push([measurement.time, measurement.deepSleep ? 20 : 0]);
        dataLS.push([measurement.time, measurement.lightSleep ? 10 : 0]);
        dataHyd.push([measurement.time, measurement.hydration]);

        dataStressGr.push([measurement.time, measurement.stress]);
//        if(measurement.stress < 25){
//            dataStressGr.push([measurement.time, measurement.stress]);
//            if(prevStress==1) dataStressYl.push([measurement.time, measurement.stress]);
//                         else dataStressYl.push([measurement.time, null]);
//            if(prevStress==2) dataStressRd.push([measurement.time, measurement.stress]);
//                         else dataStressRd.push([measurement.time, null]);
//
//            dataStressRd.push([measurement.time, null]);
//            prevStress = 0;
//        } else if (measurement.stress < 50){
//            if(prevStress==0) dataStressGr.push([measurement.time, measurement.stress]);
//                        else dataStressGr.push([measurement.time, null]);
//            dataStressYl.push([measurement.time, measurement.stress]);
//            if(prevStress==2) dataStressRd.push([measurement.time, measurement.stress]);
//            else dataStressRd.push([measurement.time, null]);
//            prevStress = 1;
//        } else {
//            if(prevStress==0) dataStressGr.push([measurement.time, measurement.stress]);
//            else dataStressGr.push([measurement.time, null]);
//            if(prevStress==1) dataStressYl.push([measurement.time, measurement.stress]);
//            else dataStressYl.push([measurement.time, null]);
//            dataStressRd.push([measurement.time, measurement.stress]);
//            prevStress = 2;
//        }
//        calEvent.push([measurement.time, (measurement.cEvent ? -10 : 0)]);
    }

    data = [
        {
            name: "heart rate",
            data: dataHR,
            type: 'spline',
            dashStyle: 'Dash'
            ,lineWidth:1
            , color: "#d83b3b"
            ,dataGrouping: { enabled: false }
//            pointStart:graphData[0].time,
//            pointInterval:1000*300
        }
        ,
        {
            name: "deep sleep",
            data: dataDS,
            type: 'area'
            ,step: true
            ,lineWidth:0
            ,fillOpacity: 0.4
            , color: "#6a7379"
            ,pointPadding: 0
            ,groupPadding:0
            , tooltip: {
//                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y == 0?"no":"yes"}</b><br/>'
                pointFormat: ''
            }
        },
        {
            name: "light sleep",
            data: dataLS,
            type: 'area'
            ,step: true
            ,lineWidth:0
            ,fillOpacity: 0.4
            , color: "#c0c7ce"
            ,pointPadding: 0
            ,groupPadding:0
            , tooltip: {
//                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y == 0?"no":"yes"}</b><br/>'
            pointFormat: ''
        }
        },
//        {
//            name: "calendar event",
//            data: calEvent
//        },
        {
            name: "steps",
            data: dataStp,
            type: 'spline',
            dashStyle: 'Dash'
            ,lineWidth:1
        }
,
        {
            name: "hydration",
            id: "hydration",
            type: 'spline',
            data: dataHyd
            , color: "#88b0ff"
            ,lineWidth:1
            , tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b><br/>'
        }
        },
        {
            name: "stress",
            id: "stress",
            type: 'area',
            data: dataStressGr
            ,lineWidth:0
            ,fillOpacity: 0.2
            ,color: '#FF5050'
            , tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y} %</b><br/>'
            }
//            ,threshold:50
        }
//        ,{
//            id: "stress2",
//            linkedTo:'stress',
//            type: 'area',
//            data: dataStressYl
//            ,lineWidth:1
//        }
//        ,{
//            id: "stress3",
//            linkedTo:'stress',
//            type: 'area',
//            data: dataStressRd
//            ,lineWidth:1
//        }
    ];

//    var yAxisOptions = [];
//    var colors = Highcharts.getOptions().colors;

    try{

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

    } catch (e){
        console.log(e)
        throw e;
    }
}
