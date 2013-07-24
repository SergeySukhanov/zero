YUI.add('vader-app', function (Y) {
    var URL_ROOT       = '/demo/';
//    var URL_DASH       = '/demo/dashboard';
//    var URL_DASH_IFR       = '/demo/dashboard_qv';

    Y.namespace('Vader').App = Y.Base.create('vader-app', Y.App, [], {
        views: {
            homeWelcome:            { type: Y.Vader.Home.Welcome },
            homeDashboard:          { type: Y.Vader.Home.Dashboard },
            homeDashboardQvIframe:  { type: Y.Vader.Home.Dashboardqviframe },
            homeDashboardjsgrapg:   { type: Y.Vader.Home.Dashboardjsgraph },
            menu:                   { type: Y.Vader.Menu}
        },

        getUser: function(){
            var user=Y.StorageLite.getItem('user', true);
            this.set('user',user);
            return user;
        },
        setUser: function(user){
            this.set('user',user);
            Y.StorageLite.setItem('user', user, true);
        },
        delUser: function(){
            Y.StorageLite.removeItem('user');
            this.set('user',null);
        },

        failureFunct: function (x, o) {
            alert("Async call failed!");
        },

        initializer: function () {
            var self = this;
            self.getUser();

            Y.after('loginUser', function (event) {
                self.setUser(event.user);
                self.Dashboardjsgraph();
            });
            Y.after('logoutUser', function (event) {
                self.delUser();
                self.showHome();
            });
            Y.after('menu:QVIFRAME', function (event) {
                self.showDashboardIframe();
            });
//            Y.after('menu:QV', function (event) {
//                self.showHome();
//            });
            Y.after('menu:JSGRAPH', function (event) {
                self.Dashboardjsgraph();
            });
        },

        showViewIfLoggedin: function(view,params){
            var user = this.getUser();
            this.showView('menu',{user:user});
            if(!user){
//                this.navigate(URL_ROOT);
                this.showView('homeWelcome');
            }else{
                this.showView(view,params);
            }
        },

        showHome: function (req, res) {
            this.showViewIfLoggedin('homeDashboardjsgrapg',{user:this.getUser()});
//            this.showViewIfLoggedin('homeDashboard',{user:this.getUser()});
        },
        showDashboardIframe: function (req, res) {
            this.showViewIfLoggedin('homeDashboardQvIframe',{user:this.getUser()});
        }
        ,
        Dashboardjsgraph: function (req, res) {
            this.showViewIfLoggedin('homeDashboardjsgrapg',{user:this.getUser()});
        }

    }, {
    ATTRS: {
        routes: {
            value: [
                { path: URL_ROOT,       callbacks: 'showHome' }
//                { path: URL_DASH_IFR,   callbacks: 'showDashboardIframe' },
//                { path: URL_DASH,       callbacks: 'showDashboard' }
            ]
        },
        user: null,
        getUser: self.getUser
    }
    });
}, '1.0', {
    requires: [
        'app',
        'promise',
        'event-custom',
        'jquery',
        'jquery-ui',
        'flot',
        'flot-selection',
        'flot-time',
        'flot-threshold',
        'gallery-storage-lite',
        'vader-home-dashboard',
        'vader-home-dashboardqviframe',
        'vader-home-dashboardjsgraph',
        'vader-menu',
        'vader-home-welcome',
        'highstock'
    ]
});
