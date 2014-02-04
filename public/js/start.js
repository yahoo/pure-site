YUI().use('grid-router', 'grid-model', 'grid-input-view', 'handlebars-runtime', function (Y) {
    'use strict';
    var gridModel = new Y.GridModel(app.start.query),
        inputView = new Y.GridInputView({
            model: gridModel,
            container: '.grid-input-tab',
            template: '#mq-template'
        });

    var gridRouter = new Y.GridRouter({
        model: gridModel,
        inputView: inputView
    });

    inputView.render();

    //just for display purposes, need to remove this
    var css = gridModel.generate();
    Y.one('.grid-output').empty().append('<pre class="code code-wrap" data-language="css">' + css + '</pre>');
});
