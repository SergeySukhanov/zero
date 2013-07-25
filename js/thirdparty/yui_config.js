var YUI_config = {};

var YUI_setConfig = function (contextPath) {
    YUI_config = {
        //base: 'js/yui/',
        groups: {
            jquery: {
                base: 'js/thirdparty/',
                async: false,
                modules: {
                    'jquery': {
                        path: 'jquery-1.9.1.js'
                    },
                    'jquery-ui': {
                        path: 'jquery-ui-1.10.3.custom.js',
                        requires: ['jquery']
                    }
                }

            },
            highstock: {
                base: 'js/thirdparty/',
                async: false,
                modules: {
                    'highstock': {
                        path: 'highstock/highstock.src.js'
                    }
                }

            },
            flot: {
                base: 'js/thirdparty/flot/',
                async: false,
                modules: {
                    'flot': {
                        path: 'jquery.flot.js'
                    },
                    'flot-selection': {
                        path: 'jquery.flot.selection.js',
                        requires: ['flot']
                    },
                    'flot-time': {
                        path: 'jquery.flot.time.js',
                        requires: ['flot']
                    },
                    'flot-threshold': {
                        path: 'jquery.flot.threshold.js',
                        requires: ['flot']
                    }
                }

            },
//            gallery: {
//                base: contextPath + '/resources/js/gallery/',
//                patterns: { 'gallery-': {} }
//            },
//            yui2: {
//                base: contextPath + '/resources/js/2in3/',
//                patterns: {
//                    'yui2-': {
//                        configFn: function (me) {
//                            if (/-skin|reset|fonts|grids|base/.test(me.name)) {
//                                me.type = 'css';
//                                me.path = me.path.replace(/\.js/, '.css');
//                                me.path = me.path.replace(/\/yui2-skin/, '/assets/skins/sam/yui2-skin');
//                            }
//                        }
//                    }
//                }
//            },
            vader: {
                base: 'js/vader/'
                ,patterns: { 'vader-': {} }
                ,filter: 'raw'
            }
        }
    };
};