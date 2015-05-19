//
// CARD = { text: "sometext" }
//
Meteor.publish('cards', function(limit) {
    Meteor._sleepForMs(2000);
    return Cards.find({ }, { limit: limit, fields: { subitems: 0 } });
});

//
// CARD = { text: "sometext", subitems: ["one", "two", "three"] }
//
Meteor.publish('card', function(id) {
    return Cards.find(id, { /* maybe some other field options */ });
})

Meteor.startup(function() {
    console.log(Cards.find().count());
    if (Cards.find().count() <= 100) {
        for (var i = 0; i < 20; i++){
            Cards.insert({
                title: 'Card '+ (i+1),
                content: 'I am a card',
                subitems: [
                    'one', 'two', 'three'
                ]
            });
        }
    }
})