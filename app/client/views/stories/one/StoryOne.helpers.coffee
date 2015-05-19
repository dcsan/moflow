Template.StoryOne.helpers
  'title': ->
    tid = FlowRouter.getParam('cname')
    return "story #{tid}"

  'tiles': ->
    [1..50]