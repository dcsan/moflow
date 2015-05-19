//
// TODO
// FlowRouter implemented route names,
// check if it meets our need instead of manual way
//

// empty name, just redirect to home
FlowRouter.route('/', {
    action: function() {
        FlowRouter.go('/home');
    }
});

FlowRouter.route('/about', {});
FlowRouter.route('/stories', {});
FlowRouter.route('/story/:cname', {});
FlowRouter.route('/home', {});

FlowRouter.route('/cards', {
    subscriptions: function(params) {
        this.handle = Meteor.subscribeWithPagination('cards', 20)
        this.register('CardsSub', this.handle);
    },
    action: function(params, queryParams) {

    }
});

FlowRouter.route('/card/:id', {
    subscriptions: function(params) {
        this.handle = Meteor.subscribe('card', params.id);
        this.register('CardSub', this.handle);
    },
    action: function(params, queryParams) {

    }
});