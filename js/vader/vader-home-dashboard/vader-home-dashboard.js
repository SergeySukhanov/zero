/*
 * shows Qlikview elements dashboard
 *
*/

YUI.add('vader-home-dashboard', function (Y) {

    exitPage = function(){
        var qv1 = Y.one('#qv_01');
        var qv2 = Y.one('#qv_02');
        var qv3 = Y.one('#qv_03');
        var qv4 = Y.one('#qv_04');
        var qv5 = Y.one('#qv_05');
        var qv6 = Y.one('#qv_06');

        qv1.getDOMNode().style.setProperty('display','none');
        qv2.getDOMNode().style.setProperty('display','none');
        qv3.getDOMNode().style.setProperty('display','none');
        qv4.getDOMNode().style.setProperty('display','none');
        qv5.getDOMNode().style.setProperty('display','none');
        qv6.getDOMNode().style.setProperty('display','none');
    };

    Y.namespace('Vader.Home').Dashboard = Y.Base.create('vader-home-dashboard', Y.View, [], {
        initializer: function () {
            var self= this;
//            Y.after('menu:QV', function (event) {
//                self.render();
//            });
            Y.after('menu:QV-HIDE', function (event) {
                exitPage ();
            });
        },

        render: function () {
            var self= this;

            Y.log('DASH');
            stopAnimation();

            var container = Y.one('#body');
            var user= self.get('user');
            if (!user){
                exitPage();
                Y.fire('logoutUser',{});
            }

            Y.log("vader-home welcome render");

            // one object
            var content = Y.one("#body");
            content.setHTML('');
            var qv1 = Y.one('#qv_01');
            var qv2 = Y.one('#qv_02');
            var qv3 = Y.one('#qv_03');
            var qv4 = Y.one('#qv_04');
            var qv5 = Y.one('#qv_05');
            var qv6 = Y.one('#qv_06');
            qv1.getDOMNode().style.setProperty('display','block');
            qv2.getDOMNode().style.setProperty('display','block');
            qv3.getDOMNode().style.setProperty('display','block');
            qv4.getDOMNode().style.setProperty('display','block');
            qv5.getDOMNode().style.setProperty('display','block');
            qv6.getDOMNode().style.setProperty('display','block');

            Qv.InitWorkBench({
                View: 'zero-white.qvw'
                ,Host: null // Instead of using "Host: 'Local'", use "Host: null"
//                ,Anonymous:true
                ,Userid : 'qlikviewservice'
                ,Password : 'Qw12345'
//                    ,BodyOnLoadFunctionNames: ['Init']
            });

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
