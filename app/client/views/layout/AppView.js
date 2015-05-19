var View               = famous.core.View;
var Surface            = famous.core.Surface;
var Transform          = famous.core.Transform;
var StateModifier      = famous.modifiers.StateModifier;
// var EventHandler       = famous.core.EventHandler;
var Easing             = famous.transitions.Easing;
// var Lightbox           = famous.views.Lightbox;
var RenderController   = famous.views.RenderController;
var HeaderFooterLayout = famous.views.HeaderFooterLayout;

/*
 * @name AppView
 * @constructor
 * @description
 */

AppView = function() {
    View.apply(this, arguments);

    // do we need this ?
    // this.eventOutput = new EventHandler();
    // this.eventInput  = new EventHandler();
    // EventHandler.setOutputHandler(this, this.eventOutput);
    // EventHandler.setInputHandler(this, this.eventInput);

    this._pages = [];
    this._currentPage = undefined;

    this.layout = new HeaderFooterLayout({
        headerSize: 50,
        footerSize: 50
    });


    //-- header
    this.header = new HeaderBarView();
    this.header.state = new StateModifier({
        transform: Transform.translate(0, 0, 10)
    });
    this.layout.header.add(this.header.state).add(this.header);

    //-- navbar
    var navbar = new TabFooterView();
    navbar.state = new StateModifier({
        // transform: Transform.inFront
        transform: Transform.translate(0, 0, 10)
    });
    this.layout.footer.add(navbar.state).add(navbar);

    //-- content
    // Commenting out this line makes animation work disabling for now
    // this.content = new Lightbox(this.options.transition);
    this.content = new RenderController();
    this.content.state = new StateModifier({
        // transform: Transform.behind
        transform: Transform.translate(0, 0, -10)
    });
    this.layout.content.add(this.content.state).add(this.content);
    this.add(this.layout);


    createPages.call(this);
    showPage.call(this);
}

AppView.prototype = Object.create(View.prototype);
AppView.prototype.constructor = AppView;

AppView.DEFAULT_OPTIONS = {
    transition: {
        inTransform: Transform.translate(500, 0, -800),
        outTransform: Transform.thenMove(Transform.rotateY(1.8), [-200, 0, -500]),
        inTransition: { curve: Easing.outExpo, duration: 350},
        outTransition: { curve: Easing.inQuad, duration: 250},
        inOrigin: [0.5, 0],
        inAlign: [0.5, 0],
        outOrigin: [0.5, 0],
        outAlign: [0.5, 0],
        showOrigin: [0.5, 0],
        showAlign: [0.5, 0],
        inOpacity: 0,
        outOpacity: 0,
        overlap: false
    }
};

AppView.prototype.getPage = function() {
    return this._currentPage;
}

AppView.prototype.createPage = function(name, view) {
    this._pages[name] = view;
}

function createPages() {

    this.createPage('home', new HomeView({
        size: [undefined, undefined],
        run: false
    }));

    this.createPage('cards', new CardListView({}));
    this.createPage('card', new CardView({}));
    this.createPage('stories', new StoryListView({}));
    this.createPage('story', new StoryOneView({}));
    this.createPage('load', new LoadView({}));

}

// main method to navigate between pages
function showPage() {
    this._eventInput.on('route changed', function(name) {

        var view = this._pages[name];               // do we have that view

        var prev = this.getPage();                  // get previous rendered view
        if (prev) {
            this._eventInput.unsubscribe(prev);     // unsubscribe from its events
            prev.trigger('leave');                  // inform that we are leaving to stop reactive stuffs
        }

        if (view) {
            this.content.show(view);
            this._currentPage = view;
            this._eventInput.subscribe(view);       // subscribe main app for that views events

            // not very useful for now, simply checks
            // if it the first time that view renders
            if (!view.options.run) {
                view.trigger('ready');
                view.options.run = true;
            }

            // change header
            this.header.trigger('route changed', name)
        }

    }.bind(this));

    // is there any page waiting for data
    this._eventInput.on('load start', function() {
        this.content.show(this._pages['load']);
    }.bind(this));

    // after subscriptions ends, show actual view
    this._eventInput.on('load end', function() {
        this.content.show(this._currentPage);
    }.bind(this));
}


