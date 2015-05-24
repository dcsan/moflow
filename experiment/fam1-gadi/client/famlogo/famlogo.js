'use strict';

// var famous = require('famous');

// Famous dependencies
var DOMElement = famous.domRenderables.DOMElement;
var FamousEngine = famous.core.FamousEngine;

// Initialize with a scene; then, add a 'node' to the scene root
var logo = FamousEngine.createScene("#animCanvas").addChild();

Template.hello.rendered = function() {

  // Create an [image] DOM element providing the logo 'node' with the 'src' path
  new DOMElement(logo, { tagName: 'div' })
      .setProperty('background-color', 'red');
      // .setAttribute('src', './images/famous-logo.svg');

  // Chainable API
  logo
      // Set size mode to 'absolute' to use absolute pixel values: (width 250px, height 250px)
      .setSizeMode('absolute', 'absolute', 'absolute')
      .setAbsoluteSize(250, 250)
      // Center the 'node' to the parent (the screen, in this instance)
      .setAlign(0.5, 0.5)
      // Set the translational origin to the center of the 'node'
      .setMountPoint(0.5, 0.5)
      // Set the rotational origin to the center of the 'node'
      .setOrigin(0.5, 0.5);

  // Add a spinner component to the logo 'node' that is called, every frame
  var spinner = logo.addComponent({
      onUpdate: function(time) {
          logo.setRotation(0, 0, time / 1000);
          logo.requestUpdateOnNextTick(spinner);
      }
  });

  // Let the magic begin...
  logo.requestUpdate(spinner);
  FamousEngine.init();

}
