/*
 * shows Qlikview elements dashboard
 *
 */

YUI.add('vader-home-dashboardqviframe', function (Y) {

    Y.namespace('Vader.Home').Dashboardqviframe = Y.Base.create('vader-home-dashboardqviframe', Y.View, [], {
        initializer: function () {
//            var self = this;
//            Y.after('menu:QVIFRAME', function (event) {
//                self.render();
//            });
        },

        render: function () {
            var self = this;

            stopAnimation();

            var container = Y.one('#body');
            var user = self.get('user');
            if (!user) {
                exitPage();
                Y.fire('logoutUser', {});
            }

            // full qlikview page
//            container.setHTML('<IFRAME title="Content" SRC="http://alexb.domain.corp/QvAJAXZfc/opendoc.htm?document=zero-white.qvw&host=QVS@alexb" WIDTH="100%" HEIGHT="750"></IFRAME>');
            container.setHTML('<IFRAME title="Content" SRC="http://54.228.91.42:8080/QvAJAXZfc/opendoc.htm?document=zero-white.qvw" WIDTH="100%" HEIGHT="750"></IFRAME>');
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
