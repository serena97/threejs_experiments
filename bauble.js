import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 ); // fov, aspect, near, far
camera.position.z = 100;


const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xfff6e6 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var ambientLight = new THREE.AmbientLight( 0xffffff, 0.2 );
scene.add( ambientLight );
var pointLight = new THREE.PointLight( 0xffffff, 1 );
pointLight.position.set( 25, 50, 25 );
scene.add( pointLight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;

var plane = new THREE.Mesh(
	new THREE.PlaneGeometry( 5, 5, 5, 5 ),
	new THREE.MeshBasicMaterial( { color: 0x222222, wireframe: true } )
);
plane.rotateX(Math.PI/2);
scene.add( plane );

var geometry = new THREE.OctahedronGeometry(10, 1);
var material = new THREE.MeshStandardMaterial( {
  color: 0xff0051,
  shading: THREE.FlatShading, // default is THREE.SmoothShading
  metalness: 0,
  roughness: 1
} );
var shapeOne = new THREE.Mesh(geometry, material);
shapeOne.position.y += 10;
shapeOne.castShadow = true;
shapeOne.receiveShadow = true;
scene.add(shapeOne);


var cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(4, 6, 10, 6, 1),
  new THREE.MeshStandardMaterial( {
      color: 'white',
      shading: THREE.FlatShading ,
      metalness: 0,
      roughness: 1
  } )
);
cylinder.position.y += 15;
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);

var shapeTwo = new THREE.Mesh(
  new THREE.TorusGeometry( 2,1, 6, 4, Math.PI),
  new THREE.MeshStandardMaterial( {
      color: 0xf8db08,
      shading: THREE.FlatShading ,
      metalness: 0,
      roughness: 0.8,
      refractionRatio: 0.25
  } )
);
shapeTwo.position.y += 20;
shapeTwo.castShadow = true;
shapeTwo.receiveShadow = true;
scene.add(shapeTwo);

renderer.render(scene, camera);
var controls = new OrbitControls( camera, renderer.domElement );
function animate() {
	requestAnimationFrame( animate );
  controls.update()
	renderer.render( scene, camera );
}
animate();