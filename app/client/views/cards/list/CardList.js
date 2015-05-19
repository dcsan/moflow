var View             = famous.core.View;
var Surface          = famous.core.Surface;
var Transform        = famous.core.Transform;
var StateModifier    = famous.modifiers.StateModifier;

var FlexScrollView   = flex.FlexScrollView;
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

    _createScrollView.call(this);
    // _createBack.call(this);

    // LOADING SCREEN
    var self = this;
    Tracker.autorun(function(c) {
        if (FlowRouter.subsReady("CardsSub")) {
            self._eventOutput.trigger('load end');
            c.stop();
        } else {
            self._eventOutput.trigger('load start');
        }
    });

    this._eventInput.on('ready', function() {
        this.handle = Cards.find().observeChanges({
            added: function (id, fields) {
                console.log(id, fields)
                self.surfaces[id] = _createCard.call(self, id, fields);
            },
            removed: function(id) {
                console.log(self.scrollView);
                console.log(self.surfaces[id]);
                self.scrollView.remove(self.surfaces[id]);
            }
        });
    }.bind(this));

    this._eventInput.on('leave', function() {
        console.info("leaving AboutView.js");
        this.handle.stop();
    }.bind(this));
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
        transform: Transform.translate(0,0,-1)
    });

    this.add(modifier).add(surface);
}

function _createScrollView() {
    this.surfaces = [];
    this.scrollView = new FlexScrollView({
        layout: CollectionLayout,
        // useContainer: true,
        // container: { // options passed to the ContainerSurface
        //     properties: {
        //         overflow: 'hidden'
        //     }
        // },
        mouseMove: true,
        direction: 1,
        alwaysLayout: true,
        flow: true,             // enable flow-mode (can only be enabled from the constructor)
        flowOptions: {
            spring: {               // spring-options used when transitioning between states
                dampingRatio: 0.8,  // spring damping ratio
                period: 1000        // duration of the animation
            },
            insertSpec: {           // render-spec used when inserting renderables
                opacity: 0,          // start opacity is 0, causing a fade-in effect,
                //size: [0, 0],     // uncommented to create a grow-effect
                // transform: Transform.translate(-300, 0, 0) // uncomment for slide-in effect
            }
            //removeSpec: {...},    // render-spec used when removing renderables
        },
        layoutOptions: {
            // cells: [2, 1],       // [col, row]
            itemSize: [150,150],    // needs fixed size?
            margins: [10, 5, 10, 5], // outer margins
            spacing: [10, 10]        // spacing between items
        },
        // dataSource: this.surfaces,
        pullToRefreshFooter: _refreshSurface()
    });

    this.scrollView.state = new StateModifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.5],
        transform: Transform.translate(0,0,1)
    });

    this.scrollView.on('refresh', function(event) {
        var currenRoute = FlowRouter._current.route;
        currenRoute.handle.loadNextPage();

        // famous.utilities.Timer.setTimeout(function() {
        // }.bind(this), 1000);

        var self = this;
        Tracker.autorun(function () {
            if (currenRoute.handle.ready()) {
                // console.log("[subscriptions ready]");
                self.scrollView.hidePullToRefresh(true);
            }
        });
    }.bind(this));

    // _insertSurface.call(this);

    this.add(this.scrollView.state).add(this.scrollView);
}

function _insertSurface() {
    var surf = new Surface({
        content: 'insert new item',
        properties: {
            color: 'white',
            textAlign: 'center',
            lineHeight: '150px',
            backgroundColor: '#FF6666'
        }
    });

    surf.on('click', function() {
        Cards.insert({
            title: 'newly inserted card',
            content: 'I am a card',
            subitems: ['famous','meteor']
        });
    })

    this.scrollView.push(surf);
}

function _refreshSurface() {
    var surf = new Surface({
        size: [undefined, 40],
        content: 'pull to refresh footer',
        classes: [],
        properties: {
            color: 'white',
            textAlign: 'center',
            backgroundColor: '#FA5C4F'
        }
    });

    return surf;
}

//
// TODO: move to new view CardItemView.js
//
function _createCard(id, data) {
    var node = new famous.core.RenderNode();

    var surf = new ReactiveTemplate({
        size: [undefined, undefined],
        template: Template.MiniCard,
        data: data,
        classes: ["minicard"],
        properties: {
            color: 'black',
            textAlign: 'center',
            backgroundColor: 'white'
        }
    });

    surf.pipe(this.scrollView);

    // remove button
    var remove = new Surface({
        size: [true, true],
        content: 'REMOVE',
        classes: [],
        properties: {
            color: 'white',
            textAlign: 'center',
            cursor: 'default',
            fontSize: '10px',
            backgroundColor: '#FA5C4F',
            zIndex: 1
        }
    });

    remove.state = new StateModifier({
        align: [0.5, 1],
        origin: [0.5, 1],
        transform: Transform.translate(20, 0, 1)
    });

    var self = this;
    remove.on('click', function(event) {
        console.log(event);
        Cards.remove(id);
    });

    // view button
    var view = new Surface({
        size: [true, true],
        content: 'VIEW',
        classes: [],
        properties: {
            color: 'white',
            textAlign: 'center',
            cursor: 'default',
            fontSize: '10px',
            backgroundColor: '#FA5C4F',
            zIndex: 1
        }
    });

    view.state = new StateModifier({
        align: [0.5, 1],
        origin: [0.5, 1],
        transform: Transform.translate(-20, 0, 1)
    });

    view.on('click', function(event) {
        FlowRouter.go('/card/'+id)
    });

    node.add(surf.state).add(surf);
    node.add(remove.state).add(remove);
    node.add(view.state).add(view);


    // RANDOM INSERT
    var num = (Math.floor(Math.random() * FlowRouter._current.route.handle.loaded()) + 1) || -1;
    this.scrollView.insert(num, node);

    // NORMAL
    // this.scrollView.push(node);

    return node;
}