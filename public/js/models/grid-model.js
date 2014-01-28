YUI.add('grid-model', function (Y) {

    var exported   = Y.Env._exported,
        rework     = Y.config.global.rework,
        pureGrids  = exported['rework-pure-grids'],
        mediaQuery = exported['css-mediaquery'];

    Y.GridModel = Y.Base.create('grid-model', Y.Model, [], {

        initializer: function (cfg) {
            var mq = this.hasMQ(cfg);
            if (mq) {
                this.set('mediaQueries', mq);
            }
        },

        generate: function () {
            var css = rework('').use(pureGrids.units(this.get('cols'), {
                mediaQueries: this.get('mediaQueries')
            })).toString();

            return css;
        },

        checkMediaQuery: function (mq) {
            return mediaQuery.parse(mq);
        },

        hasMQ: function (obj) {
            var o = Y.merge(obj);
            delete o.cols;
            delete o.fonts;
            delete o.prefix;
            if (Object.getOwnPropertyNames(o).length === 0) {
                return false;
            }
            return o;
        }

    }, {
        ATTRS: {
            cols: {
                value: null,

                //convert strings to arrays when set() called
                setter: function (str) {
                    return str.split(",").map(function(x){
                        return parseInt(x);
                    });
                }
            },

            fonts: {
                value: null
            },

            mediaQueries: {
                value: null,

                //we only set the object if it has valid media queries.
                setter: function (val) {
                    var mq = {};
                    Y.Object.each(val, function (prop, key) {
                        if (mediaQuery.parse(prop)) {
                            mq[key] = prop;
                        }
                    });
                    return mq;
                }
            }
        }
    });

}, '0.0.1', {
    requires: ['model', 'rework', 'rework-pure-grids', 'css-mediaquery']
});



