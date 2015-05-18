View = famous.core.View
Surface = famous.core.Surface
Transform = famous.core.Transform
StateModifier = famous.modifiers.StateModifier
FlexScrollView = flex.FlexScrollView
CollectionLayout = flex.layouts.CollectionLayout

famodev.helpers
ReactiveTemplate = famodev.ReactiveTemplate


_createBack = ->
  surface = new Surface
    size: [
      100
      100
    ]
    content: 'back'
    # properties: 'background-color': '#67FBE6'

  modifier = new StateModifier
    origin: [0.5, 0.5]
    align: [0.5, 0.5]
    transform: Transform.behind

  @add(modifier).add(surface)
  return

_createMain = (tree) ->
  storyData = {title: "storyTitle"}

  surf = new ReactiveTemplate
    size: [undefined, undefined ]
    template: Template.StoryOne
    data: storyData
    classes: [ 'minicard' ]
    properties:
      color: 'black'
      textAlign: 'center'
      backgroundColor: 'white'

  # surf.state = new StateModifier(transform: Transform.translate(0, 0, 1))
  # surf.pipe scrollView
  surf.url = "/story/"
  # node.add(surf.state).add surf

  # TODO routing from story list to story detail page
  surf.on('click', ->
    console.log("url is", this.url)
    # FlowRouter.go(this.url);
  )

  modifier = new StateModifier
    transform: Transform.inFront

  tree.add(modifier).add(surf)
  return


###
# @name StoryOneView
# @constructor
# @description
###

@StoryOneView = ->
  View.apply this, arguments
  _createBack.call this
  _createMain(this)
  # _createMain.call this


StoryOneView.prototype = Object.create(View.prototype)
StoryOneView::constructor = StoryOneView
StoryOneView.DEFAULT_OPTIONS = {}

# TODO respond to 'ready' event in instance