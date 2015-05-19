View = famous.core.View
Surface = famous.core.Surface
Transform = famous.core.Transform
StateModifier = famous.modifiers.StateModifier
FlexScrollView = flex.FlexScrollView
CollectionLayout = flex.layouts.CollectionLayout

famodev.helpers
ReactiveTemplate = famodev.ReactiveTemplate


_createBack = (tree, scrollView) ->
  surface = new Surface
    size: [undefined, 50]
    content: 'Storylist background'
    properties: {
      'background-color': 'purple'
      color: 'white'
    }

  modifier = new StateModifier
    origin: [ 0.5, 0.5 ]
    align: [0.5, 0]
    # transform: Transform.behind
    transform: Transform.translate(0,0, -1)

  tree.add(modifier).add surface
  surface.pipe(scrollView)
  return surface

_createScrollView = (tree) ->
  surfaces = []
  scrollView = new FlexScrollView
    layout: CollectionLayout
    mouseMove: true
    direction: 2
    layoutOptions:
      itemSize: [ true, 150 ]
      margins: [0, 0, 0, 0 ]
      spacing: [5, 5]
    dataSource: surfaces

  i = 0
  surf = undefined
  while i <= 20
    node = new (famous.core.RenderNode)

    #TODO - get data from a subscription
    storyData = {
      title: 'story ' + i
    }
    surf = new ReactiveTemplate(
      size: [
        undefined
        undefined
      ]
      template: Template.StoryCard
      data: storyData
      properties:
        color: 'black'
        textAlign: 'center'
        backgroundColor: 'white')
    surf.state = new StateModifier(transform: Transform.translate(0, 0, 1))
    surf.pipe scrollView
    surf.url = "/story/" + i
    node.add(surf.state).add surf

    # TODO routing from story list to story detail page
    surf.on('click', ->
      console.log("url is", this.url)
      FlowRouter.go(this.url);
    )

    # famous.utilities.Timer.setTimeout(function() {}, 100);
    surfaces.push node
    i++
  behind = new StateModifier
    origin: [0.5, 0.5]
    align: [0.5, 0.5]
    # transform: Transform.inFront
    transform: Transform.translate(0,0, 1)

  tree.add(behind).add scrollView
  return scrollView


###
# @name StoryListView
# @constructor
# @description
###

@StoryListView = ->
  View.apply this, arguments
  scrollView = _createScrollView(this)
  _createBack(this, scrollView)
  return

StoryListView.prototype = Object.create(View.prototype)
StoryListView::constructor = StoryListView
StoryListView.DEFAULT_OPTIONS = {}
