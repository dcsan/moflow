var View          = famous.core.View;
var Surface       = famous.core.Surface;
var Transform     = famous.core.Transform;
var StateModifier = famous.modifiers.StateModifier;

/*
 * @name CardView
 * @constructor
 * @description
 */

CardView = function() {
    View.apply(this, arguments);

    _createCard.call(this);
}

CardView.prototype = Object.create(View.prototype);
CardView.prototype.constructor = CardView;

CardView.DEFAULT_OPTIONS = {
};

// Blaze
function _createCard() {
    var surf = new famodev.ReactiveTemplate({
        size: [undefined, undefined],
        template: Template.FullCard,
        classes: [],
        properties: {
            color: 'black',
            textAlign: 'center',
            backgroundColor: 'white'
        }
    });

    this.add(surf);
}

Template.FullCard.helpers({
    card: function() {
        return Cards.findOne(FlowRouter.getParam('id'));
    }
});

// Famous
// function _createCard() {
//     var surf = new Surface({
//         size: [undefined, undefined],
//         content: "loading",
//         classes: [],
//         properties: {
//             color: 'black',
//             textAlign: 'center',
//             backgroundColor: 'white'
//         }
//     });

//     // basic idea is something like that
//     Tracker.autorun(function () {
//         var card = Cards.findOne(FlowRouter.getParam('id'));
//         if (card) surf.setContent(card.title);
//     });

//     this.add(surf);
// }

// Famodev
// function _createCard() {
//     var surf = new famodev.ReactiveSurface({
//         size: [undefined, undefined],
//         content: function() {
//             var card = Cards.findOne(FlowRouter.getParam('id'));
//             if (item) return card.title;
//         },
//         classes: [],
//         properties: {
//             color: 'black',
//             textAlign: 'center',
//             backgroundColor: 'white'
//         }
//     });

//     this.add(surf);
// }