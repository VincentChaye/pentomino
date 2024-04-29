import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
import './style.css';



// Creation scene

var scene = new THREE.Scene();

const camera = new THREE.OrthographicCamera( innerWidth / - 2, innerWidth  / 2, innerHeight / 2, innerHeight / - 2, 1, 1000 );
camera.position.set(0, 10, 0);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var light = new THREE.AmbientLight(0xffffff, 100, 10 );
light.position.set(0, 0, 4);
scene.add(light);

//creation des pentominos






function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
