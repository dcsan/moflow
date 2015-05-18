var View          = famous.core.View;
var Surface       = famous.core.Surface;
var Transform     = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

var FlexScrollView = flex.FlexScrollView;
var CollectionLayout = flex.layouts.CollectionLayout;

famodev.helpers;
var ReactiveTemplate = famodev.ReactiveTemplate;

/*
 * @name CardListView
 * @constructor
 * @description
 */

CardListView = function() {
    View.apply(this, arguments);
    sc = _createScrollView.call(this);
    _createBack(this, sc);
}

CardListView.prototype = Object.create(View.prototype);
CardListView.prototype.constructor = CardListView;

CardListView.DEFAULT_OPTIONS = {
};

function _createBack(tree, scrollView) {
    var surface = new Surface({
        size: [undefined, undefined],
        content: "CardList background",
        classes: ["background"],
        properties: {
            'background-color': 'yellow'
        }
    });

    var modifier = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        // transform: Transform.behind
        transform: Transform.translate(0,0,-1)
    });

    tree.add(modifier).add(surface);

    surface.pipe(scrollView);
}

function _createScrollView() {
    surfaces = []
    var scrollView = new FlexScrollView({
      layout: CollectionLayout,
      // useContainer: true,
      // container: { // options passed to the ContainerSurface
      //     properties: {
      //         overflow: 'hidden'
      //     }
      // },
      mouseMove: true,
      direction: 1,
      // autoPipeEvents: true,
      layoutOptions: {
        itemSize: [150,150],    // needs fixed size?
        margins: [10, 5, 10, 5], // outer margins
        spacing: [10, 10]        // spacing between items
      },
      dataSource: surfaces
    });

    for(var i = 0, surf; i <= 100; i++) {
        var node = new famous.core.RenderNode();

        cardData = {
          title: "card " + i
        }

        surf = new ReactiveTemplate({
            size: [undefined, undefined],
            template: Template.MiniCard,
            data: cardData,
            classes: ["minicard"],
            properties: {
                color: 'black',
                textAlign: 'center',
                backgroundColor: 'white'                
            }
        });

        surf.state = new StateModifier({
            // align: [0, 0],
            // origin: [0, 0],
            transform: Transform.translate(0, 0, 1)
        });

        surf.idx = i;
        surf.on('click', function() {
            url = "/cards/" + this.idx;
            console.log("card click", url);
            // FlowRouter.go(url);
        });

        surf.pipe(scrollView);
        
        node.add(surf.state).add(surf);

        // famous.utilities.Timer.setTimeout(function() {}, 100);
        surfaces.push(node);
    }

    scrollView.state = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        // transform: Transform.inFront
        transform: Transform.translate(0,0,1)
    });

    this.add(scrollView.state).add(scrollView);
    return scrollView;
}