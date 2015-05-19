// Card = {
//      title: String
//      content: String
//      date: Date
// }

// Card = function (doc) {
//   _.extend(this, doc);
// };

// _.extend(Card.prototype, {

// });

// Cards = new Mongo.Collection("cards", {
//   transform: function (doc) { return new Card(doc); }
// });

// simply 
Cards = new Mongo.Collection("cards");
