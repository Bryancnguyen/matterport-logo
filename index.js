let camera, scene, renderer, geometry, tempGeometry, material, obj;

let maxLevitate = 10;
let currentLevitate = 0;
let goingUp = true;
init();
animate();

function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(0, 0, 850);
  scene.add(camera);
obj = createLShapeMesh();
  const light = new THREE.DirectionalLight(0xfcfcfc, 5);
  light.position.set(1, 1 ,0);
  light.target = obj;
  light.castShadow = true;
  scene.add(light);
  scene.add(obj);
  scene.background = new THREE.Color( 0x222222 );

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);
}

function createLShapeMesh() {
var root = new THREE.Object3D();
  var shapes = [];
 
  var material = new THREE.MeshPhongMaterial({
  color: 0xFF3158,
transparent: true,
    side: THREE.DoubleSide,
    reflectivity: 1,
    opacity: 0.8,
    specular: 0xFC7A8C,
  });
  var rotations = [
  {x: 25, y: -43.05, z: 0},
  ];
  var positions = [
  {x: 0, y: 0, z: 0},
  ];
  var LShapeGeometry = [
 {x:1, y: 0, z: 0},
          {x:1, y: 1, z: 0},
          {x:1, y: 2, z: 0},
          {x:-1, y: 0, z: 0},
          {x: 1, y: 3, z: 0},
          {x: 1, y: 4, z: -0},
          {x: 1, y: 4, z: -1},
          {x: 1, y: 4, z: -2},
          {x: 1, y: 4, z: -3},
          // OPPOSITE SIDE
          {x: 0, y: 4, z: -3},
          {x: -1, y: 4, z: -3},
          {x: -2, y: 4, z: -3},
          {x: -2, y: 3, z: -3},
          {x: -2, y: 2, z: -3},
          {x: -2, y: 1, z: -3},
          {x: -2, y: 0, z: -3},
          {x: -2, y: 0, z: -2},
          {x: -2, y: 0, z: -1},
          {x: -2, y: 0, z: 0},
  ];
for (var i = 0; i < 1; i++) {
    var geometry = new THREE.CubeGeometry(50, 50, 50);
    for (var j = 0; j < LShapeGeometry.length; j++) {
      tempGeometry = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
      tempGeometry.position.x = 50 * LShapeGeometry[j].x;
      tempGeometry.position.y = 50 * LShapeGeometry[j].y;
      tempGeometry.position.z = i === 1 ? 50 * LShapeGeometry[j].z : -1 * (50 * LShapeGeometry[j].z);
      tempGeometry.updateMatrix();
      geometry.merge(tempGeometry.geometry, tempGeometry.matrix);
    }
   
    const mesh = new THREE.Mesh(geometry, material);
   
    mesh.rotateX(degreesToRadians(rotations[i].x)); /// 180
    mesh.rotateY(degreesToRadians(rotations[i].y));
    mesh.rotateZ(degreesToRadians(rotations[i].z));
    mesh.position.x += positions[i].x;
    mesh.position.y += positions[i].y;
    mesh.position.z += positions[i].z;


  root.add(mesh);
  }
  return root;
}

function degreesToRadians(degree) {
return degree * (Math.PI / 180);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  obj.rotation.y -= 0.05;
  /* if (parseFloat(currentLevitate.toFixed(1)) === maxLevitate) {
    goingUp = false;
  }
  else if (parseFloat(currentLevitate.toFixed(1)) === 0) {
    goingUp = true;
  }
  let addValue = goingUp ? 0.1 : -0.1;
  obj.position.y += addValue;
  currentLevitate += addValue; */
 }

function render() {
  renderer.render(scene, camera);
}

