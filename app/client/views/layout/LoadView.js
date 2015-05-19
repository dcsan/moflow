var View          = famous.core.View;
var Surface       = famous.core.Surface;
var EventHandler  = famous.core.EventHandler;
var StateModifier = famous.modifiers.StateModifier;

/*
 * @name LoadView
 * @constructor
 * @description
 */

LoadView = function() {
    View.apply(this, arguments);

    this._eventInput.on('ready', function() {
        console.info("LoadView.js is ready");
    });

    this._eventInput.on('leave', function() {
        console.info("leaving LoadView.js");
    });

    _createSurface.call(this);
}

LoadView.prototype = Object.create(View.prototype);
LoadView.prototype.constructor = LoadView;

LoadView.DEFAULT_OPTIONS = {
};

function _createSurface() {
    var surface = new Surface({
        size: [500, 500],
        content: "LOADING",
        properties: {
            'color': 'white',
            'text-align': 'center',
            'font-size': '2em',
            'line-height': '500px',
            'background-color': 'red'
        }
    });

    surface.on('click', function() {
        FlowRouter.go('/home');
    })

    var modifier = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this.add(modifier).add(surface);
}