import './style.css'

import * as THREE from 'three'

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

renderer.render(scene, camera)
