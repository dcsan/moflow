Template.StoryOne.helpers
  'title': ->
    tid = FlowRouter.getParam('cname')
    return "title #{tid}"
    #     item: function() {
    #     return Items.findOne(FlowRouter.getParam('id'));
    # }

  'tiles': ->
    [1..50]