import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


@Component({
  selector: 'app-object',
  standalone: true,
  imports: [],
  template: `
<div id="container" class="w-[624px] h-[624px]"></div>
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
      this.initControls();

      // Écoutez les événements de la souris
      window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
      window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
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
      this.renderer.shadowMap.enabled = true;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      container.appendChild(this.renderer.domElement);
      container.addEventListener('wheel', (event) => {
        event.preventDefault(); // Empêche le comportement par défaut (scroll de la page)
        event.stopPropagation(); // Empêche la propagation de l'événement
      }, { passive: false });
    } else {
      console.error("Le conteneur n a pas ete trouve");
      
    }

    // Ajout d'un sol pour recevoir les ombres
    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // Utilisez un matériau qui reçoit les ombres
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    
    // Rotation du sol pour le rendre horizontal
    // ground.rotation.x = - Math.PI / 2; // Cela fait que le plan est horizontal
    // ground.position.y = -0.3; // Positionnez le sol en bas pour qu'il soit sous l'objet
    // ground.receiveShadow = true; // Le sol reçoit des ombres
    // this.scene.add(ground);

    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // or THREE.BasicShadowMap

    const ambientLight = new THREE.AmbientLight(0x404040);
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10).normalize();
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 1024; // Taille de la carte d'ombre (largeur)
    directionalLight.shadow.mapSize.height = 1024; // Taille de la carte d'ombre (hauteur)
    directionalLight.shadow.camera.near = 0.1; // Distance de la caméra d'ombre
    directionalLight.shadow.camera.far = 100; // Distance maximale de la caméra d'ombre
    
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
        // obj.traverse((child) => {
        //   if((child as THREE.Mesh).isMesh) {
        //     child.castShadow = true;
        //   }
        // })
        this.scene.add(obj);
        const box = new THREE.Box3().setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        this.camera.position.set(center.x, center.y, size.length() * 1.5);
        this.camera.lookAt(center);
        this.controls.target.copy(center);

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

  private initControls(): void {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableZoom = true;
    this.controls.maxDistance = 0.7;
    this.controls.minDistance = 0.31;
    this.controls.rotateSpeed = 0.4;
    this.controls.enablePan = false; // deplacement lateral
    // this.controls.enableDamping = true;  // fluidite
    // this.controls.dampingFactor = 0.05 // Lissage
    this.controls.update();
  }
  private preventDefaultActions(): void {
    const container = document.getElementById('container');
    if (container) {
      container.addEventListener('mousedown', (event) => event.preventDefault());
      container.addEventListener('pointerdown', (event) => event.preventDefault());
    }
  }
  
  private onMouseDown(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
        this.selectedObject = intersects[0].object;
        this.offset.copy(intersects[0].point).sub(this.selectedObject.position);
        document.body.style.cursor = 'pointer'; // Change cursor to pointer
    }
}

private onMouseMove(event: MouseEvent): void {
    if (this.selectedObject) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            const newPosition = intersects[0].point.sub(this.offset);
            this.selectedObject.position.copy(newPosition);
        }
    }
}

private onMouseUp(): void {
    this.selectedObject = null;
    document.body.style.cursor = 'auto'; // Reset cursor
}
  
}
