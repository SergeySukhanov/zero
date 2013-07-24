YUI.add('vader-home-welcome', function (Y) {

    onLoginSubmit = function(){
        //Y.one("#main").setHTML('');
        onLoginBtnPress();
        return false;
    };

    failureFunct= function (x, o) {
        alert("Async call failed!");
    };

    onLoginBtnPress = function(){
        Y.log('login pressed');
        var login = Y.one('#inputEmail').get('value');
        var password = Y.one('#inputPassword').get('value');
        Y.one('#inputEmailGrp').removeClass('error');
        Y.one('#inputPasswordGrp').removeClass('error');


        Y.log('login:'+login+' pass:'+password);

        var rnn = Math.random()*1000;
        Y.io("/api/users.json?"+rnn, {
            timeout: 15000,
            on: {
                success: function(x, o){
                    onLoginSuccess(x, o,login,password);
                }
                , failure: failureFunct
            }
        });

    };
    onLoginSuccess=  function(x, o,login,pass){
//            Y.log('111');
//        self = this;
        var users = [];
        try {
            users = Y.JSON.parse(o.responseText);
            for (var i in users) {
                if(login == users[i].email && pass == 'pete4SAINT'){
                    Y.fire('loginUser',{user:users[i]});
                    return;
                }
            }
            //error
            Y.one('#inputEmailGrp').addClass('error');
            Y.one('#inputPasswordGrp').addClass('error');
//            showLoginForm(users);
        } catch (e) {
            Y.log("JSON Parse failed!" + e);

        }
    };


    showLoginForm= function (users){
        var self = this;
        var content = Y.one("#main");
//        var wrap = function (anUser,self1) {
//            var auser = anUser;
//            var self = self1;
//            Y.one("#user_" + anUser.id).on("click", function (event) {
//                Y.fire('loginUser',{user:auser});
//            });
//        };

        // top: background-color:#5e7074
        // common: background-color:#dddddd
        // form: background-color:#d3d3d3
        content.setHTML(
            '<div class="span6 offset5" style="position:absolute; top: 200px; background-color:#dddddd">' +
                '<div style="background-color: #5e7074;padding: 10px">DEMO login</div>' +
//                '<table class="table table-bordered table-striped table-hover table-condensed" style="margin-top:20px">' +
//                '<thead><td>ID</td><td>Name</td></thead><tbody id="users_table_body"></tbody></table>' +
//                '<button class="btn btn-small" id="closeUsersList">Close</button>' +
                '<form class="form-horizontal" id="loginForm" style="padding-top: 20px;">' +
                '<div class="control-group" id="inputEmailGrp"><label class="control-label" for="inputEmail" style="width:140px">Email</label>' +
                '<div class="controls" style="margin-left: 130px;width: 250px;">' +
                '<input type="text" id="inputEmail" placeholder="Email" autocomplete="true" style="-webkit-border-radius:0;border-radius:0"></div></div>' +
                '<div class="control-group" id="inputPasswordGrp"><label class="control-label" for="inputPassword" style="width:140px">Password</label>' +
                '<div class="controls" style="margin-left: 130px;width: 250px;">' +
                '<input type="password" id="inputPassword" placeholder="Password" style="-webkit-border-radius:0;border-radius:0"></div></div>' +
                '<div class="control-group">' +
                '<div class="controls" style="margin-left: 130px;width: 250px;">' +
                '<button type="button" class="btn" id="loginBtn" style="text-shadow: 0 0 0;background-color: #5f7175; background-image: linear-gradient(to bottom, #5f7175, #5f7175)">Login</button>&nbsp;&nbsp;&nbsp;&nbsp;'+
                '<button type="button" class="btn" id="closeUsersList" style="text-shadow: 0 0 0;background-color: #9ba5a7; background-image: linear-gradient(to bottom, #9ba5a7, #9ba5a7)">Close</button></div></div>'+
                '</form>'+
                '</div>');
        Y.one('#loginBtn').on('click', onLoginSubmit);
        Y.one('#loginForm').on('submit', onLoginSubmit);
        Y.one('#closeUsersList').on('click', function(){
            Y.one("#main").setHTML('');
        });

        Y.one('#inputEmail').focus();
//        var tb = Y.one('#users_table_body');
//        for (var i in users) {
//            tb.append('<tr id="user_' + users[i].id + '"><td>' + users[i].id + '</td><td>' + users[i].name + '</td></tr>')
//            wrap(users[i],self);
//        }
    };

    Y.namespace('Vader.Home').Welcome = Y.Base.create('vader-home-welcome', Y.View, [], {
        initializer: function () {
        },

//        failureFunct: function (x, o) {
//            alert("Async call failed!");
//        },


//        onLoginClick: function () {
//            var self = this;
//            Y.log("login");
//            // get list of users for DEMO
//            var rnn = Math.random()*1000;
//            Y.io("/api/users.json?"+rnn, {
//                timeout: 5000,
//                on: {
//                    success: self.onLoginSuccess
//                    , failure: self.failureFunct
//                }
//            });


//            var io = new Y.IO();
//            var config = {timeout: 3000, on:{}};
//            config.on.failure= Y.Vader.Home.Welcome.failureFunct;
//            config.on.success= Y.Vader.Home.Welcome.failureFunct;
//            io.send("/api/users.json",config);
//        },

//        onLoginSuccess:  function(x, o){
////            Y.log('111');
//            self = this;
//            var users = [];
//            try {
//                users = Y.JSON.parse(o.responseText);
//                showLoginForm(users);
//            } catch (e) {
//                Y.log("JSON Parse failed!" + e);
//
//            }
//        },

        render: function () {
            var self = this;
            var container = Y.one('#body');
            Y.log("vader-home welcome render");
            container.setHTML(Y.one('#t-welcome').getHTML());

            $form = $("#div_form");
            $input = $("#email_input");
            $fog = $("#fog");
            $thx = $("#div_thanks");
            $fog.hide();
            $form.hide();
            $thx.hide();
            $splain = $("#splain");

// make some origin Points
            for (var i = 0; i < origin_count; i++) {
                // put the origin in the x middle (ish) of origin_count screen sections
                // and keep y on screen!
                var screen_section_left = w / origin_count * i;
                var screen_section_width = w / origin_count;
                var screen_section_center = screen_section_left + screen_section_width / 2;

                var origin = new Point(rdm(screen_section_width / 5), rdm(h / 4));

                origin.x = screen_section_center + origin.x; // cheat, keep it centeredish
                origin.y = ( h / 2 ) + origin.y; // cheat, keep it centeredish

                pies[i] = new Pie(origin, slices_count, "pie_" + i);
                pies[i].setOrigin(origin);
                pies[i].draw();
            }
            // animate
// start with random velocities
            for ( i = 0; i < pies.length; i++ ) {
                velos[i] = new Vect( rnd_bmt() );
            }

            animate(pies);

            var login_btn = Y.one("#login_btn");
            Y.log(login_btn);
            login_btn.on('click',function (){
//                Y.log("login_btn pressed");
                showLoginForm();
//                self.onLoginClick();
            });

            return self;
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
    'json-parse',
    'event-custom'
] });
