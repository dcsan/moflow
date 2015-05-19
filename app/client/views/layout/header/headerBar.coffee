View          = famous.core.View;
Surface       = famous.core.Surface;
Transform     = famous.core.Transform;
EventHandler  = famous.core.EventHandler;
StateModifier = famous.modifiers.StateModifier;
InputSurface  = famous.surfaces.InputSurface;


createHeader = (tree) ->
  # View.apply(this, arguments)

  surface = new Surface
      size: [undefined, undefined]
      content: "MoFlow"
      classes: ["header"]
      properties:
        'background-color': 'yellow'

  modifier = new StateModifier
      origin: [0.5, 0.5]
      align: [0.5, 0.5]
      # transform: Transform.translate(0,0,-1)

  tree.add(modifier).add(surface);


@HeaderBarView = ->
  View.apply this, arguments
  createHeader(this)

HeaderBarView.prototype = Object.create(View.prototype)
HeaderBarView::constructor = HeaderBarView
