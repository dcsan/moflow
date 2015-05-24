// Template.scene.rendered = function() {
//   debugger
//   var scene = new THREE.Scene();
//   var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   var renderer = new THREE.WebGLRenderer();
//   // renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);
//   console.log("added three scene");
// }


// var camera, scene, renderer, geometry, material, mesh, rendererCSS;

// var object;

// function init() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
//   camera.position.z = 500;
//   scene.add(camera);  
//   renderer = new THREE.CSS3DRenderer();
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   return scene;
// }

// function addDiv(scene) {  
//   var blob = document.createElement( 'div' );
//   blob.className = 'blob';
//   blob.textContent = "THREE.JS";
//   blob.style.color = "red"
//   blob.style.backgroundColor = "green"
//   object = new THREE.CSS3DObject( blob ); 
//   document.body.appendChild(renderer.domElement);
//   scene.add(object);
// }

// function basicScene() {
//   scene = new THREE.Scene();
//   camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
//   renderer = new THREE.WebGLRenderer();
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   document.body.appendChild( renderer.domElement );
//   camera.position.z = 5;  
//   return scene;
// }


// function addCube(scene) {
//   var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//   var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//   var cube = new THREE.Mesh( geometry, material );
//   scene.add( cube );
// }

// function animate() {
//   requestAnimationFrame(animate);
//   if (object) {
//     object.rotation.x += 0.03;
//   }
//   render();
// }

// function render() {
//   renderer.render(scene, camera);
// }

// function createScene() {
//   console.log("createScene");
//   scene = basicScene();
//   addCube(scene);
//   render();
//   // animate();
// }

Template.scene.rendered = function() {
  console.log("template rendered");
  setTimeout( cubeScene, 3000);
}

function cubeScene() {
  console.log("cubeScene");
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  var cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.z = 5;

  var render = function () {
    console.log("render")
    requestAnimationFrame( render );

    cube.rotation.x += 0.1;
    cube.rotation.y += 0.1;

    renderer.render(scene, camera);
  };

  render();

}

