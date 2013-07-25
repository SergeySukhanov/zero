/*
 * shows js graph
 *
 */

YUI.add('vader-home-dashboardjsgraph', function (Y) {

    var data = null;

    Y.namespace('Vader.Home').Dashboardjsgraph = Y.Base.create('vader-home-dashboardjsgraph', Y.View, [], {

        initializer: function () {
            var self = this;
        },

        render: function () {
            var self = this;

            Y.log('JS DASH');
            stopAnimation();

            var user = self.get('user');
            if (!user) {
                Y.fire('logoutUser', {});
            }

            var container = Y.one('#body');
            container.setHTML(
                '<div id="placeholder" class="demo-placeholder" style="float:left; width:100%; height:410px;"></div>'+
                '<div class="smallGraph first"><h1>Sleep Efficiency 33%</h1><p>Last night slept for 3hr18m</p>'+
                   '<div id="placeholderSleep" class="demo-placeholder" style="float:left; width:100%; height:140px;"></div>'+
                '</div>'+
                '<div class="smallGraph"><h1>Eating Habits</h1><p>Higt Carb diet</p>'+
                   '<div id="placeholderEat" class="demo-placeholder" style="float:left; width:100%; height:140px;"></div>'+
                '</div>'+
                '<div class="smallGraph"><h1>Stress vs Wellness</h1><p>Recommend the members to take a vacation</p>'+
                   '<div id="placeholderStress" class="demo-placeholder" style="float:left; width:100%; height:140px;"></div>'+
                '</div>'
//                    +
//                '<div class="clearfix"></div>' +
//                '<div id="overview" class="demo-placeholder" style="float:left;width:90%; height:125px;"></div>'
            );

            if(data == null){

            Y.io('/api/' + user.id + '/data.json?' + Math.random() * 1000, {
                timeout: 15000,
                on: {
                    success: function(x, o){
//                        try {
                            var newData = Y.JSON.parse(o.responseText);
                            //error
                            data = newData;
                            onJsGraphDataLoad(data);
//            showLoginForm(users);
//                        } catch (e) {
//                            Y.log("JSON Parse failed!" + e);
//
//                        }

//                        onLoginSuccess(x, o,login,password);
                    }
                    , failure: failureFunct
                }
            });

            } else {
                onJsGraphDataLoad(data);
            }
//            ShowJsGraph(user.id);
//            var options = {
//                legend: {
//                    show: false
//                },
//                series: {
//                    lines: {
//                        show: true
//                    },
//                    points: {
//                        show: false
//                    }
//                },
//                yaxis: {
//                    ticks: 10
//                },
//                selection: {
//                    mode: "x"
//                }
//            };
//            var startData = getData(0, 3 * Math.PI);
//            Y.log($.plot);
//            Y.log($);
//            Y.log(JQuery);

//            var plot = $.plot("#placeholder", startData, options);
//            var overview = $.plot("#overview", startData, {
//                legend: {
//                    show: false
//                },
//                series: {
//                    lines: {
//                        show: true,
//                        lineWidth: 1
//                    },
//                    shadowSize: 0
//                },
//                xaxis: {
//                    ticks: 4
//                },
//                yaxis: {
//                    ticks: 3,
//                    min: -2,
//                    max: 2
//                },
//                grid: {
//                    color: "#999"
//                },
//                selection: {
//                    mode: "x"
//                }
//            });
//
//
//            $("#placeholder").bind("plotselected", function (event, ranges) {
//
//                // clamp the zooming to prevent eternal zoom
//
//                if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
//                    ranges.xaxis.to = ranges.xaxis.from + 0.00001;
//                }
//
//                if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
//                    ranges.yaxis.to = ranges.yaxis.from + 0.00001;
//                }
//
//                // do the zooming
//
//                plot = $.plot("#placeholder", getData(ranges.xaxis.from, ranges.xaxis.to),
//                    $.extend(true, {}, options, {
//                        xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
//                        yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
//                    })
//                );
//
//                // don't fire event on the overview to prevent eternal loop
//
//                overview.setSelection(ranges, true);
//            });
//
//            $("#overview").bind("plotselected", function (event, ranges) {
//                plot.setSelection(ranges);
//            });

            // Add the Flot version string to the footer

//            $("#footer").prepend("Flot " + $.plot.version + " &ndash; ");

            return this;
        }
    }, {
        ATTRS: {
            user: {
                value: null
            }
        }
    });

}, '1.0', { requires: [
    'io',
    'event-custom',
    'vader-menu',
    'json-parse'
] });
