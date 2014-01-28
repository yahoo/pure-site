YUI({
    modules: {
        'grid-model': '/js/models/grid-model.js'
    }
}).use('grid-model', function (Y) {

    'use strict';

    var gridModel = new Y.GridModel(app.start.query);
    console.log(gridModel.generate());
    console.log(gridModel.toJSON());
});
