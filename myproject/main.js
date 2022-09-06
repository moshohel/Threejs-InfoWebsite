import './style.css'

import * as THREE from 'three'
// import * as THREE from './node_modules/three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Images:
import spaceImg from './space.jpg'
import moonImg from './moon.jpg'
import normalImg from './normal.jpg'
// import friendsImg from './friends.jpg'

// YOU NEED THREE THINGS --
// 1. Scene (Like a container what holdes all objects, camera, lights )
// 2. Camera (there are many types of cameras In Three js)
// 3. Renderer (Render out the actual Graphic scene)

// 1 ---
const scene = new THREE.Scene()
// 2 ---
// Here we use PerspectiveCamera. It mimic what Human Eye will see.
// Perspective camera takes 4 arguments
// First Argument is Field of View(which is the amount of world is visible based on 360 digree)
// Second Argument is Aspect Ratio(Based on user brower Window)
// Thired and Fourth for View Frustum(To Control Which objects are visible from camera)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)
// 3 ---
// Render out the actual Graphic scene
// Renderer needs to know which DOM Elements to use
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)

// renderer.render(scene, camera)

// **** YOU NEED THREE THINGS for Adding object
// 1. Geometry or A set of vectors that defines that object
// 2. Material- The wrapping paper for an object which object color or texture
// 3. MESH - convinding geomerty and material

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// Most Materials required a Light source
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// }) // this basic not require a light source

const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
}) // this basic not require a light source

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)
// renderer.render(scene, camera)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  // Randomly position stars through the scene
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

// How many stars do we want to add to the scene?
Array(200).fill().forEach(addStar)

// Background:

const spaceTexture = new THREE.TextureLoader().load(spaceImg)
scene.background = spaceTexture

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera)
}

animate()
