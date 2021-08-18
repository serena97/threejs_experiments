import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 ); // fov, aspect, near, far
camera.position.z = 100;


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
// light.position.set(-1, 2, 4);
scene.add(light);


const geometry = new THREE.SphereGeometry(32); // box geometry for rect cube, w, h, d


const textureLoader = new THREE.TextureLoader()
textureLoader.crossOrigin = true;
const texture = textureLoader.load("eliyahoo.jpg");
texture.repeat.set( 2, 1 );
texture.wrapS = THREE.MirroredRepeatWrapping;
texture.wrapT = THREE.MirroredRepeatWrapping;
var material = new THREE.MeshPhongMaterial( {bumpMap: texture, map: texture} );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );


// function makeInstance(geometry, color, x) {
//   const material = new THREE.MeshLambertMaterial({ color: color });
//   const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);
//   cube.position.x = x;
//   return cube;
// }

// const cubes = [
//   makeInstance(geometry, 'red',  0),
//   makeInstance(geometry, 'blue', -2),
//   makeInstance(geometry, 'green',  2),
// ];

function animate() {
	requestAnimationFrame( animate );
  // cubes.forEach((cube, idx) => {
  //   const rot = idx * 0.05
  //   cube.rotation.x += rot;
  //   cube.rotation.y += rot;
  // })
  mesh.rotation.x += 0.01;
  controls.update()
	renderer.render( scene, camera );
}
animate();
