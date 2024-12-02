import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


@Component({
  selector: 'app-object',
  standalone: true,
  imports: [],
  template: `
<div id="container" class="w-[1024px] h-[1024px]"></div>
  `,
  styleUrl: './object.component.css'
})
export class ObjectComponent {
  the_object = 'assets/models/obj/scene.gltf';

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private raycaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private offset: THREE.Vector3;
  private selectedObject: THREE.Object3D | null = null;
  private controls!: OrbitControls;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.offset = new THREE.Vector3();

    setTimeout(() => {
      this.initScene();
      this.loadModel();
      this.startAnimation();
    }, 0);
  }

  private initScene(): void {
    this.scene.background = null;
    // this.scene.background = new THREE.Color(0xeeeeee);

    const container = document.getElementById('container');

    if(container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      container.appendChild(this.renderer.domElement);
    } else {
      console.error("Le conteneur n a pas ete trouve");
      
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    this.scene.add(directionalLight)
  }

  private loadModel(): void {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      this.the_object,
      (gltf) => {
        const obj = gltf.scene;
        obj.position.set(0, 0, 0);
        obj.scale.set(1, 1, 1);
        this.scene.add(obj);

        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        this.camera.position.set(center.x, center.y, size.length() * 1.5);
        this.camera.lookAt(center);

        console.log("Chargement termine : 100%");
      },
      (xhr) => {
        const loadePercentage = (xhr.loaded / xhr.total) * 100;
        console.log(`Chargement en cours : ${loadePercentage.toFixed(2)}%`);
      },
      (error) => console.log('Erreur lors du chargement du fichier GLB', error)
      
    );
  }

  private startAnimation() {
    const animate = () => {
      requestAnimationFrame(animate);

      this.renderer.render(this.scene, this.camera);
    };
    animate();
  }
  
}
