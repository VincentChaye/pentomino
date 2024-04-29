import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils';
// import {clone} from '/Users/lieut/Desktop/threeJS/clone';
import './style.css';



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Déclaration de la variable plato en dehors de la fonction loader.load
var plato;
var F,I,L,N,P,T,U,V,W,X,Y,Z;



// Creation des contours de la forme en wireframe avec des clones
var F_clone,I_clone,L_clone,N_clone,P_clone,T_clone,U_clone,V_clone,W_clone,X_clone,Y_clone,Z_clone;
var child_list_name = ['F','I','L','N','P','T','U','V','W','X','Y','Z'];
var child_list = [F,I,L,N,P,T,U,V,W,X,Y,Z];
var child_clone = [F_clone,I_clone,L_clone,N_clone,P_clone,T_clone,U_clone,V_clone,W_clone,X_clone,Y_clone,Z_clone];
var geoF;



///////////////////////////////////////////////////////////////////////////INDENTATION DE LA SCENE ET CREATION DES VARIABLES//////////////////////////////////////////////////////////////////////////////////////:

// Déclaration des variables et constantes
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(innerWidth / -35, innerWidth / 35, innerHeight / 35, innerHeight / -35, 0.1, 1000);

camera.position.set(0, 30, 0);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const loader = new GLTFLoader();

//fond de la scene
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('publique/grey.jpg');
scene.background = texture;

// Liste pour stocker les objets sélectionnés
var selectedObjects = [];

// Importation du fichier glTF de Blender
loader.load('publique/croix.glb', function (gltf) {
    const gltfScene = gltf.scene;
    scene.add(gltfScene);

    if (gltfScene) {
        // Accédez aux enfants de la scène principale pour trouver l'objet
        gltfScene.traverse(function(child) {
            if (child.name === 'plato') {
               plato = child;
               console.log(child.wireframe);
            }
            if (child.name == 'F'){
                child.layers.enable(2);
                F = child;
            }
            if (child.name == 'I'){
                child.layers.enable(2);
                I = child;
            }
            if (child.name == 'L'){
                child.layers.enable(2);
                L = child;
            }
            if (child.name == 'N'){
                child.layers.enable(2);
                N = child;
            }
            if (child.name == 'P'){
                child.layers.enable(2);
                P = child;
            }
            if (child.name == 'T'){
                child.layers.enable(2);
                T = child;
            }
            if (child.name == 'U'){
                child.layers.enable(2);
                U = child;
            }
            if (child.name == 'V'){
                child.layers.enable(2);
                V = child;
            }
            if (child.name == 'W'){
                child.layers.enable(2);
                W = child;
            }
            if (child.name == 'X'){
                child.layers.enable(2);
                X = child;
            }
            if (child.name == 'Y'){
                child.layers.enable(2);
                Y = child;
            }
            if (child.name == 'Z'){
                child.layers.enable(2);
                Z = child;
            }

        });
    } else {
        console.error("La scène GLTF n'est pas définie.");
    }

   /* F_clone = F.geomtry;
    geoG = F_clone.clone()
    console.log(geoF);*/

    });

  undefined, function (error) {
    console.error(error);
};

// Les lumières
var light = new THREE.AmbientLight(0xffffff, 100, 10 );
light.position.set(0, 0, 4);
scene.add(light);

var pointlight = new THREE.PointLight(0xFFFFFF, 5);
pointlight.position.set(0, 0, 5);
scene.add(pointlight);

///////////////////////////////////////////////////////////////////////////////////// LES FONCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    raycaster.layers.set( 2 ); 
    var intersects = raycaster.intersectObjects(scene.children, true); 

    if (intersects.length > 0 && intersects[0].object.name != 'Cube027' && intersects[0].object.name != 'Cube027_1' && intersects[0].object.name != 'Cube027_2' && intersects[0].object.name != 'Cube027_3') {
        var clickedObject = intersects[0].object;
        //var couleur = clickedObject.material.color;
        if (clickedObject.userData.selectable !== false) {
            var index = selectedObjects.indexOf(clickedObject);
            if (index === -1) {
                selectedObjects.push(clickedObject);
                //clickedObject.material.color.set(0xff8000); 
                clickedObject.userData.initialY = clickedObject.position.y;
                clickedObject.position.x = Math.round(clickedObject.position.x);
                clickedObject.position.z = Math.round(clickedObject.position.z);
            } else {
                selectedObjects.splice(index, 1);
                //clickedObject.material.color.set(couleur);

                if (Math.round(clickedObject.position.x) % 2 == 0) {
                    clickedObject.position.x = Math.round(clickedObject.position.x) + 1;
                } else {
                    clickedObject.position.x = Math.round(clickedObject.position.x);
                }
                if (Math.round(clickedObject.position.z) % 2 == 0) {
                    clickedObject.position.z = Math.round(clickedObject.position.z);
                } else {
                    clickedObject.position.z = Math.round(clickedObject.position.z) + 1;
                }
            }
        }
    }
}

/////////////////////////////////deux a cinq, deux a six ... deux a douze ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function onMouseMove(event) {
    if (selectedObjects.length > 0) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.layers.set( 2 ); 
        var selectedObject = selectedObjects[0];
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
            var deltaY = selectedObject.position.y - selectedObject.userData.initialY;
            selectedObject.position.copy(intersects[0].point);
            selectedObject.position.y -= deltaY; 

            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 + deltaY / window.innerHeight;
            
            console.log("Intersection found:", intersects[0].point);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////// SUPERPOSITION ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////:

// fonction pour détecter les intersections entre les objets et la géométrie plane
function detectIntersection() {      
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        // Une intersection est détectée, changez la couleur de la pièce intersectée en bleu
        var intersectedObject = intersects[0].object;
        intersectedObject.material.color.set(0x0000ff);
    } else {
        // Aucune intersection détectée, remettez la couleur des pièces à leur couleur d'origine
        selectedObjects.forEach(object => {
            object.material.color.set(0xff0000);
        });
    }
}

 
///ROTATE //////////////////
function rotateObjects(degrees) {
    if (selectedObjects.length > 0) {
        selectedObjects.forEach(object => {
            object.rotateY(THREE.MathUtils.degToRad(degrees)  );
        });
    }
}

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            rotateObjects(90);
            break;
        case 'ArrowRight':
            rotateObjects(-90);
            break;
    }
}, false);

/// ROTATE IN SYMETRIE/////  ///// empiler les pieces x3 x2 x1

function symetrieObjects(degrees) {
    if (selectedObjects.length > 0) {
        selectedObjects.forEach(object => {
            object.rotateZ(THREE.MathUtils.degToRad(degrees));
        });
    }
}

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowUp':
            symetrieObjects(180);
            break;
        case 'ArrowDown':
            symetrieObjects(-180);
            break;
    }
}, false);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//CODE POUR CRÉÉ UN MENU\\
/* on recréé une scene pour un menu */
/*

var menu = new THREE.scene();

var menuGeo = new THREE.BoxGeometry(0,5,-5);
var menuMat = new THREE.MeshBasicMaterial({ color: 0x00ff00});

function activeMenu()
{
    scene.visible = false;

    menu.visible = true;
}
 

function desactiveMenu()
{
    scene.visible=true;

    menu.visible= false;
}

*/

/* un code couleur avec superposition et carré a l'exterieur en erreur bi color; 
 differants mode : mode avec pieces imposé et mode avec pieces libre et pieces en doubles, pieces x  2,3,4
pieces qui reviennes quand on les bouges or du tab classement en groupe facile moyen et difficile
creation de puzzle; ;

resolution de probleme geometrique

fiche de suivie avec fiche par niveau et code par niveau   */ 

/* premierement finir le test avec le tableau carré 
    ensuite une fois que tous fonctionne passé a la création */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Écouteurs d'événements pour la souris
window.addEventListener('click', function (event) {
    onClick(event);
}, false);

window.addEventListener('mousemove', function (event) {
    onMouseMove(event);
}, false);

// Boucle d'animation
function animate() {
    requestAnimationFrame(animate);
    //console.log(L.geometry)
    renderer.render(scene, camera);
}

animate();

