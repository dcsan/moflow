/**
 * Created by rubyist on 29/03/15.
 */

FlowRouter.route('/about', {});

FlowRouter.route('/home', {
    subscriptions: function(params, queryParams) {
      // do subs
    },
    action: function() {
        FlowRouter.go('/home');
    }
});



FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/home');
    }
});

FlowRouter.route('/stories', {
    action: function() {
        FlowRouter.go('/stories');
    }
});

FlowRouter.route('/cards', {
    action: function() {
        FlowRouter.go('/cards');
    }
});


FlowRouter.route('/story/:cname', {

    subscriptions: function(params, queryParams) {
      // do subs
    },
  
    action: function(params, queryParams) {
        url = '/story/' + params.cname;
        FlowRouter.go(url);
    }
});


