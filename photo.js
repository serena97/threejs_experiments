import fragmentShader from './frag.js'
import vertexShader from './vert.js'

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor( 0xfff6e6 );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 70;

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("eliyahoo.jpg");
let time = 0
let position = 0
const material = new THREE.ShaderMaterial({
  side: THREE.DoubleSide,
  vertexShader,
  fragmentShader,
  uniforms: {
    time: { type: 'f', value: time },
    pixels: { type: 'v2', value: new THREE.Vector2(window.innerWidth / 10, window.innerHeight/ 10) },
    accel: { type: 'v2', value: new THREE.Vector2(0.5, 2) },
    progress: { type: 'f', value: 0 },
    uvRate1: {
      value: new THREE.Vector2(1, 1)
    },
    texture1: {
      value: texture
    },
    texture2: {
      value: texture
    }
  }
})
let geometry = new THREE.PlaneGeometry(window.innerWidth / 10, window.innerHeight / 10, 1, 1);
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

function animate() {
	requestAnimationFrame( animate );
  time += 0.05
  position += 0.01

  // enable webgl debuger pls
  //that's for cloth animation which i still don't get
  // let idx;
  // const normal = new THREE.Vector3();
  // const indices = geometry.index;
  // const normals = geometry.attributes.normal;

  // for(let i = 0, il = indices.count; i < il; i+=3) {
  //   for(let j = 0; j < 3; j++) {
  //     idx = indices.getX(i + j);
  //     normal.fromBufferAttribute(normals, idx);
  //   }
  // }

  material.uniforms.time.value = time

  const posI = Math.round(position)
  const diff = posI - position

  position += diff * 0.035

  if (Math.abs(posI - position) < 0.001) {
    position = posI
  }

  material.uniforms.progress.value = position

	renderer.render( scene, camera );
}
animate();
