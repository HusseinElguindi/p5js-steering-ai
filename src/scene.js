import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const gridHelper = new THREE.GridHelper(100, 10);
gridHelper.rotateX(Math.PI/2);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const spotLight = new THREE.PointLight(0xffffff, 1);
spotLight.position.set(50, 0, 50);
scene.add(spotLight);

const resize = () => {
    if (!renderer) return;

    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);

let renderer;
export const createScene = (el) => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
    renderer.setPixelRatio(window.devicePixelRatio);

    resize();
    animate();
};

const sqs = Array(50);
for (let i = 0; i < sqs.length; i++) {
    sqs[i] = new THREE.Mesh(
        new THREE.BoxGeometry(1, 3, 1, 1, 1, 1),
        new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    scene.add(sqs[i]);
}

const animate = () => {
    requestAnimationFrame(animate);

    sqs.forEach((sq) => {
        sq.position.y += 0.1;
        sq.rotation.z += Math.PI/100;
    });

    renderer.render(scene, camera);
};