var View          = famous.core.View;
var Surface       = famous.core.Surface;
var EventHandler  = famous.core.EventHandler;
var StateModifier = famous.modifiers.StateModifier;

famodev.helpers;
var ReactiveTemplate = famodev.ReactiveTemplate;

/*
 * @name HomeView
 * @constructor
 * @description
 */

HomeView = function() {
    View.apply(this, arguments);

    var surface = new ReactiveTemplate({
        size: [undefined, undefined],
        template: Template.home,
        data: {title: "welcome to ComicEnglish"},
        classes: [],
        properties: {
            color: 'black',
            textAlign: 'center',
            backgroundColor: 'white'
        }
    });

    // var surface = new Surface({
    //     size: [undefined, undefined],
    //     content: "HomeView",
    //     properties: {
    //         'background-color': '#eee'
    //     }
    // });

    // surface.on('click', function() {
    //     FlowRouter.go('/about');
    // })

    var modifier = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5]
    });

    this.add(modifier).add(surface);
}

HomeView.prototype = Object.create(View.prototype);
HomeView.prototype.constructor = HomeView;

HomeView.DEFAULT_OPTIONS = {
};


  
