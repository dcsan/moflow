View          = famous.core.View
Surface       = famous.core.Surface
Transform     = famous.core.Transform
# Easing        = famous.transitions.Easing
StateModifier = famous.modifiers.StateModifier
InputSurface  = famous.surfaces.InputSurface
Lightbox      = famous.views.Lightbox

createHeader = (tree, section) ->
    surface = new Surface
        size: [undefined, undefined]
        content: section
        classes: ["header"]
        properties:
            'background-color': 'yellow'

    # modifier = new StateModifier
        # origin: [0.5, 0.5]
        # align: [0.5, 0.5]
        # transform: Transform.translate(0,0,-1)

    # tree.add(modifier).add(surface);
    tree.headers.push(surface)

@HeaderBarView = ->
    View.apply this, arguments
    
    @headers = []
    @layout = new Lightbox(@options.transition)
    @add(@layout)

    for section, i in @options.sections
        createHeader(this, section)

    @_eventInput.on 'route changed', ((name) ->
        index = _.indexOf(@options.sections, name.capitalize())
        @layout.show(@headers[index])
    ).bind(this)

    return


HeaderBarView.prototype = Object.create(View.prototype)
HeaderBarView::constructor = HeaderBarView

HeaderBarView.DEFAULT_OPTIONS = {
    # TODO define me once
    sections: [ 
        'Home'
        'Stories'
        'Cards'
    ]
    transition: {
        inTransform  : Transform.translate(0, -100, 0),
        outTransform : Transform.translate(0, -100, 0),
        inTransition: {curve: 'easeOutBounce', duration: 375},
        outTransition: {curve: 'easeIn', duration: 225},
        overlap      : false
    }
}