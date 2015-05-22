var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');

FamousEngine.init();
var scene = FamousEngine.createScene();

var node = scene.addChild();
var domEl = new DOMElement(node, {
    content: 'Hello World',
    properties: {
        fontFamily: 'Arial'
    }
});