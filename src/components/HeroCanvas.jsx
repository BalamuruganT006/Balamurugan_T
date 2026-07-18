import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { gsap } from 'gsap';

export default function HeroCanvas() {
  const wrapperRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    let renderer;
    try {
      // Create a temporary canvas to check WebGL support
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl2') || testCanvas.getContext('webgl');
      if (!gl) {
        console.warn('WebGL not supported');
        setHasError(true);
        return;
      }

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn('WebGL not available, skipping 3D canvas:', e.message);
      setHasError(true);
      return;
    }

    if (!renderer) {
      setHasError(true);
      return;
    }

    // Replace wrapper content with Three.js canvas
    const canvas = renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.className = 'hero-canvas';
    wrapper.innerHTML = '';
    wrapper.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1, 3.5);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.AmbientLight(0xffffff, 0.4));

    const keyLight = new THREE.DirectionalLight(0xf5f5f0, 2.5);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc8ff00, 0.6);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xf5f5f0, 1.5, 10);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    let model = null;
    const loader = new GLTFLoader();
    loader.load('/models/branding-logo.glb', (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 0.8 / maxDim;
      model.scale.setScalar(scale);
      model.position.sub(center.multiplyScalar(scale));
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.envMapIntensity = 1.5;
          child.material.metalness = 0.3;
          child.material.roughness = 0.4;
        }
      });
      scene.add(model);
      gsap.fromTo(model.scale, { x: 0, y: 0, z: 0 },
        { x: scale, y: scale, z: scale, duration: 1.8, ease: 'elastic.out(1, 0.6)', delay: 2.5 });
    }, undefined, (err) => console.error('Error loading GLB:', err));

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 2;
    controls.maxDistance = 6;
    controls.enablePan = false;
    controls.autoRotate = false;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;

    let mouseX = 0, mouseY = 0, isHovering = false;
    const onMouseEnter = () => { isHovering = true; };
    const onMouseLeave = () => { isHovering = false; };
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    canvas.addEventListener('mouseenter', onMouseEnter);
    canvas.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousemove', onMouseMove);

    let rafId;
    function animate() {
      rafId = requestAnimationFrame(animate);
      if (model && !isHovering) {
        model.rotation.y += 0.008;
        model.rotation.x = THREE.MathUtils.lerp(model.rotation.x, mouseY * 0.1, 0.05);
      }
      if (!isHovering) {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.2, 0.05);
      }
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mouseenter', onMouseEnter);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  if (hasError) return null;

  return <div ref={wrapperRef} className="hero-canvas" />;
}