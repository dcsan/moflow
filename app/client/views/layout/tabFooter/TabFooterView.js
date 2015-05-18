var View          = famous.core.View;
var Surface       = famous.core.Surface;
var Transform     = famous.core.Transform;
var EventHandler  = famous.core.EventHandler;
var StateModifier = famous.modifiers.StateModifier;
var InputSurface  = famous.surfaces.InputSurface;

flex.widgets.styles;
var TabBar = flex.widgets.TabBar;

/*
 * @name TabFooterView
 * @constructor
 * @description
 */

TabFooterView = function() {
    View.apply(this, arguments);

    var tabBar = new TabBar({
        createRenderables: {
            background: true,
            selectedItemOverlay: true
        }
    });

    var tabBarItems = [
        'Home', 
        'Stories',
        'Cards'
    ];
    tabBar.setItems(tabBarItems);
    tabBar.on('tabchange', function(event) {
        var item = tabBarItems[event.index];
        var url = item.charAt(0).toLowerCase() + item.slice(1);
        FlowRouter.go('/'+url);
    });

    tabBar.state = new StateModifier({
        transform: Transform.inFront
        // transform: Transform.translate(0,0,2)
    });
    // this.add(tabBar); // add to the render-tree
    this.add(tabBar.state).add(tabBar);

}

TabFooterView.prototype = Object.create(View.prototype);
TabFooterView.prototype.constructor = TabFooterView;

TabFooterView.DEFAULT_OPTIONS = {
};