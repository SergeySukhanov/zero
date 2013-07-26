YUI.add('vader-menu', function (Y) {

    show = function(){
        var menu = Y.one('#menu');
        menu.getDOMNode().style.setProperty('display','block');
        Y.log('show mwnu');
    };

    hide = function(){
        var menu = Y.one('#menu');
        menu.getDOMNode().style.setProperty('display','none');
    };

    setActiveMenu=  function(){
        var elem = Y.Vader.Menu.ATTRS.active.value;
            Y.one('#menu_jsgraph').removeClass('active');
            Y.one('#menu_qviframe').removeClass('active');
            Y.one('#'+elem).addClass('active');
    };
    Y.namespace('Vader').Menu = Y.Base.create('vader-menu', Y.View, [], {
        initializer: function () {
            var self= this;
            return this;
        },

        render: function () {
            var user = this.get('user');
            var container = Y.one('#menu');
            if (!user ){
                hide();
                container.setHTML('');
                return;
            }
            show();
            container.setHTML('<div class="navbar navbar-inverse navbar-static-top"><div class="navbar-inner">'+
                '<span class="brand" style="padding: 5px"><img src="img/zero_logo.png" height="40px" width="193px"></span>'+
                '<ul class="nav" style="padding: 8px">'+
                    '<li id="time"></li>'+
					'<li id="date"></li>'+
                    '</ul>'+
                '<ul class="nav pull-right" id="nav_login_ul" style="padding: 8px"></ul>'+
                '</div></div>');
            var nav_login_ul = Y.one("#nav_login_ul");
            nav_login_ul.setHTML('<li class="dropdown" >' +
                '<a class="dropdown-toggle" data-toggle="dropdown" href="#">' + user.name + '&nbsp;<b class="caret"></b></a>' +
                '<ul class="dropdown-menu">'+
                '<li id="menu_jsgraph"><a href="#">Immediately</a></li>'+
                '<li id="menu_qviframe"><a href="#">Custom</a></li>'+
                '<li id="logout"><a href="#">logout</a><li class="divider"></li>'+
                '</ul>'
            );

            Y.one('#logout').on('click', function(){
                Y.fire('logoutUser',{});
            });
//            Y.one('#menu_qv').on('click', function(){
//                Y.fire('menu:QV',{});
//                Y.Vader.Menu.ATTRS.active.value = 'menu_qv';
//                setActiveMenu();
//            });
            Y.one('#menu_qviframe').on('click', function(){
                Y.Vader.Menu.ATTRS.active.value = 'menu_qviframe';
                setActiveMenu();
                Y.fire('menu:QVIFRAME',{});
//                Y.fire('menu:QV-HIDE',{});
                return false;
            });
            Y.one('#menu_jsgraph').on('click', function(){
//                Y.fire('menu:QV-HIDE',{});
                Y.Vader.Menu.ATTRS.active.value = 'menu_jsgraph';
                setActiveMenu();
                Y.fire('menu:JSGRAPH',{});
                return false;
            });
            setActiveMenu(Y.Vader.Menu.ATTRS.active.value);
        }
    }, {
        ATTRS: {
            user: {
                value: null
            },
            active: {
                value: 'menu_jsgraph'
            }

        }
    });

}, '1.0', { requires: [
    'io',
    'event-custom',
    'json-parse'
] });
