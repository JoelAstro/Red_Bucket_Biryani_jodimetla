import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, Sparkles, Flame } from 'lucide-react';

interface Bucket3DViewerProps {
  bucketScale?: number;
  className?: string;
  autoRotateDefault?: boolean;
}

export const Bucket3DViewer: React.FC<Bucket3DViewerProps> = ({
  bucketScale = 1,
  className = '',
  autoRotateDefault = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(autoRotateDefault);
  const [showSteam, setShowSteam] = useState(true);
  const [activeView, setActiveView] = useState<'front' | 'top' | 'isometric'>('isometric');

  // References to communicate with animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const bucketGroupRef = useRef<THREE.Group | null>(null);
  const steamSystemRef = useRef<THREE.Points | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 5.8);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Lighting setup - Cinematic studio food commercial lighting
    const ambientLight = new THREE.AmbientLight(0xfff0da, 1.2);
    scene.add(ambientLight);

    // Warm key light (golden saffron glow)
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.5);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Red fill light from left to enhance bucket brand saturation
    const fillLight = new THREE.DirectionalLight(0xf20b12, 1.4);
    fillLight.position.set(-4, 3, 2);
    scene.add(fillLight);

    // Golden rim light from behind for silhouette separation
    const rimLight = new THREE.DirectionalLight(0xffd21c, 2.2);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Subtle bottom bounce light
    const bounceLight = new THREE.DirectionalLight(0xff8844, 0.6);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // 5. Build Bucket Group
    const bucketGroup = new THREE.Group();
    bucketGroupRef.current = bucketGroup;
    scene.add(bucketGroup);

    // --- Texture Generator for Bucket Exterior with RBB Branding ---
    const createBucketTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Red gradient background
        const grad = ctx.createLinearGradient(0, 0, 0, 512);
        grad.addColorStop(0, '#f20b12');
        grad.addColorStop(0.5, '#c90016');
        grad.addColorStop(1, '#8f0010');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 1024, 512);

        // Gold decorative top and bottom borders
        ctx.fillStyle = '#ffd21c';
        ctx.fillRect(0, 15, 1024, 8);
        ctx.fillRect(0, 27, 1024, 3);
        ctx.fillRect(0, 485, 1024, 8);
        ctx.fillRect(0, 475, 1024, 3);

        // Repeat Brand Graphics around cylinder (front, back)
        const centers = [256, 768];
        centers.forEach((cx) => {
          // White emblem badge
          ctx.save();
          ctx.translate(cx, 260);

          // Outer gold glow ring
          ctx.beginPath();
          ctx.arc(0, 0, 140, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
          ctx.lineWidth = 6;
          ctx.strokeStyle = '#ffd21c';
          ctx.stroke();

          // Inner red ring
          ctx.beginPath();
          ctx.arc(0, 0, 126, 0, Math.PI * 2);
          ctx.fillStyle = '#fff9f0';
          ctx.fill();
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#f20b12';
          ctx.stroke();

          // Logo typography
          ctx.textAlign = 'center';
          ctx.fillStyle = '#f20b12';
          ctx.font = '900 36px "Impact", "Arial Black", sans-serif';
          ctx.letterSpacing = '2px';
          ctx.fillText('RED BUCKET', 0, -35);

          ctx.fillStyle = '#c90016';
          ctx.font = '900 44px "Impact", "Arial Black", sans-serif';
          ctx.letterSpacing = '4px';
          ctx.fillText('BIRYANI', 0, 10);

          // Gold star separator
          ctx.fillStyle = '#ffd21c';
          ctx.font = '22px Arial';
          ctx.fillText('★ ★ ★', 0, 38);

          // Jodimetla Branch pill
          ctx.fillStyle = '#f20b12';
          ctx.beginPath();
          ctx.roundRect(-100, 52, 200, 32, 16);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 15px Arial, sans-serif';
          ctx.letterSpacing = '1px';
          ctx.fillText('JODIMETLA BRANCH', 0, 74);

          ctx.restore();
        });
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // --- Texture Generator for Rice / Biryani Mound ---
    const createBiryaniTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Base saffron & basmati cream color
        ctx.fillStyle = '#fce49b';
        ctx.fillRect(0, 0, 512, 512);

        // Specks of saffron golden rice, white basmati, and spiced red-brown
        for (let i = 0; i < 4000; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          const len = 3 + Math.random() * 6;
          const angle = Math.random() * Math.PI;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);

          const r = Math.random();
          if (r < 0.35) {
            ctx.fillStyle = '#ffffff'; // White basmati
          } else if (r < 0.65) {
            ctx.fillStyle = '#ffbb00'; // Saffron grain
          } else if (r < 0.85) {
            ctx.fillStyle = '#e8740c'; // Spiced orange grain
          } else {
            ctx.fillStyle = '#4a2503'; // Fried onion strand (birista)
          }

          ctx.fillRect(-len / 2, -1, len, 2);
          ctx.restore();
        }

        // Green fresh coriander specks
        for (let i = 0; i < 300; i++) {
          const x = Math.random() * 512;
          const y = Math.random() * 512;
          ctx.fillStyle = Math.random() > 0.5 ? '#15803d' : '#22c55e';
          ctx.beginPath();
          ctx.arc(x, y, 1.5 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const bucketTexture = createBucketTexture();
    const biryaniTexture = createBiryaniTexture();

    // 1. Bucket Body (Cylinder tapered takeaway bucket)
    // RadiusTop: 1.25, RadiusBottom: 0.95, Height: 2.1
    const bucketGeo = new THREE.CylinderGeometry(1.25, 0.95, 2.1, 48, 1, true);
    const bucketMat = new THREE.MeshStandardMaterial({
      map: bucketTexture,
      roughness: 0.28,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const bucketMesh = new THREE.Mesh(bucketGeo, bucketMat);
    bucketMesh.castShadow = true;
    bucketMesh.receiveShadow = true;
    bucketGroup.add(bucketMesh);

    // 2. Bucket Bottom Base
    const baseGeo = new THREE.CircleGeometry(0.95, 48);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x8f0010, roughness: 0.5 });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.rotation.x = Math.PI / 2;
    baseMesh.position.y = -1.05;
    baseMesh.receiveShadow = true;
    bucketGroup.add(baseMesh);

    // 3. Bucket Top Gold Rim (Roll / Lip of the bucket)
    const rimGeo = new THREE.TorusGeometry(1.26, 0.055, 16, 48);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xffd21c,
      metalness: 0.7,
      roughness: 0.25,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.05;
    bucketGroup.add(rimMesh);

    // 4. Bucket Handles on sides (wire bail ear mounts)
    const handleMountGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const mountLeft = new THREE.Mesh(handleMountGeo, rimMat);
    mountLeft.position.set(-1.26, 0.85, 0);
    bucketGroup.add(mountLeft);

    const mountRight = new THREE.Mesh(handleMountGeo, rimMat);
    mountRight.position.set(1.26, 0.85, 0);
    bucketGroup.add(mountRight);

    // 5. Biryani Mound inside the bucket
    const moundGeo = new THREE.SphereGeometry(1.22, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.42);
    const moundMat = new THREE.MeshStandardMaterial({
      map: biryaniTexture,
      roughness: 0.85,
      metalness: 0.05,
      bumpMap: biryaniTexture,
      bumpScale: 0.08,
    });
    const moundMesh = new THREE.Mesh(moundGeo, moundMat);
    moundMesh.position.y = 0.82;
    moundMesh.scale.set(1, 0.65, 1);
    moundMesh.castShadow = true;
    bucketGroup.add(moundMesh);

    // 6. Realistic Spiced Chicken Piece protruding from the biryani mound
    const chickenGroup = new THREE.Group();
    // Chicken meat chunk
    const chickenGeo = new THREE.SphereGeometry(0.38, 20, 20);
    chickenGeo.scale(1.2, 0.8, 1.0);
    const chickenMat = new THREE.MeshStandardMaterial({
      color: 0xb44415,
      roughness: 0.55,
      metalness: 0.1,
    });
    const chickenMesh = new THREE.Mesh(chickenGeo, chickenMat);
    chickenMesh.castShadow = true;
    chickenGroup.add(chickenMesh);

    // Bone / shank protrusion with crisp glaze
    const boneGeo = new THREE.CylinderGeometry(0.06, 0.08, 0.55, 12);
    const boneMat = new THREE.MeshStandardMaterial({ color: 0xdfcbaf, roughness: 0.7 });
    const boneMesh = new THREE.Mesh(boneGeo, boneMat);
    boneMesh.position.set(0.32, 0.28, 0);
    boneMesh.rotation.z = -Math.PI / 4;
    chickenGroup.add(boneMesh);

    chickenGroup.position.set(0.2, 1.15, 0.15);
    chickenGroup.rotation.set(0.3, 0.4, -0.2);
    bucketGroup.add(chickenGroup);

    // 7. Open Lid Resting against the side of the bucket (adds dramatic realism)
    const lidGroup = new THREE.Group();
    const lidBodyGeo = new THREE.CylinderGeometry(1.28, 1.28, 0.1, 48);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0xc90016,
      roughness: 0.35,
      metalness: 0.2,
    });
    const lidMesh = new THREE.Mesh(lidBodyGeo, lidMat);
    lidMesh.castShadow = true;
    lidGroup.add(lidMesh);

    // Gold rim on lid
    const lidRimGeo = new THREE.TorusGeometry(1.29, 0.04, 16, 48);
    const lidRimMesh = new THREE.Mesh(lidRimGeo, rimMat);
    lidRimMesh.rotation.x = Math.PI / 2;
    lidGroup.add(lidRimMesh);

    // Lid handle / recessed top
    const lidKnobGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.08, 24);
    const lidKnob = new THREE.Mesh(lidKnobGeo, rimMat);
    lidKnob.position.y = 0.08;
    lidGroup.add(lidKnob);

    // Position lid tilted dynamically behind/to the right
    lidGroup.position.set(1.4, -0.15, -0.6);
    lidGroup.rotation.set(0.4, -0.3, 0.55);
    bucketGroup.add(lidGroup);

    // 8. Ground Contact Shadow Disc
    const shadowGeo = new THREE.CircleGeometry(1.6, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x0a0505,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.15;
    scene.add(shadowMesh);

    // 9. Rising Steam Particle System
    const steamParticleCount = 65;
    const steamGeo = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamParticleCount * 3);
    const steamScales = new Float32Array(steamParticleCount);
    const steamAlphas = new Float32Array(steamParticleCount);
    const steamVelocities = new Float32Array(steamParticleCount);

    for (let i = 0; i < steamParticleCount; i++) {
      // Scatter over the biryani mound
      const r = Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      steamPositions[i * 3 + 0] = Math.cos(theta) * r;
      steamPositions[i * 3 + 1] = 1.1 + Math.random() * 1.5;
      steamPositions[i * 3 + 2] = Math.sin(theta) * r;

      steamScales[i] = 15 + Math.random() * 30;
      steamAlphas[i] = 0.2 + Math.random() * 0.4;
      steamVelocities[i] = 0.008 + Math.random() * 0.012;
    }

    steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    // Create soft round steam particle texture
    const steamCanvas = document.createElement('canvas');
    steamCanvas.width = 64;
    steamCanvas.height = 64;
    const sCtx = steamCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(32, 32, 2, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 245, 230, 0.8)');
      grad.addColorStop(0.4, 'rgba(255, 235, 210, 0.4)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 64, 64);
    }
    const steamTexture = new THREE.CanvasTexture(steamCanvas);

    const steamMat = new THREE.PointsMaterial({
      size: 0.35,
      map: steamTexture,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const steamSystem = new THREE.Points(steamGeo, steamMat);
    steamSystemRef.current = steamSystem;
    bucketGroup.add(steamSystem);

    // Apply overall scale
    bucketGroup.scale.set(bucketScale, bucketScale, bucketScale);
    bucketGroup.position.y = 0.1;

    // 10. Pointer Drag Rotation Handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !bucketGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      bucketGroupRef.current.rotation.y += deltaX * 0.008;
      bucketGroupRef.current.rotation.x = Math.max(
        -0.3,
        Math.min(0.5, bucketGroupRef.current.rotation.x + deltaY * 0.005)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !bucketGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      bucketGroupRef.current.rotation.y += deltaX * 0.008;
      bucketGroupRef.current.rotation.x = Math.max(
        -0.3,
        Math.min(0.5, bucketGroupRef.current.rotation.x + deltaY * 0.005)
      );

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 11. Animation Loop with steam simulation & subtle floating
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle breathing float oscillation
      if (bucketGroupRef.current) {
        bucketGroupRef.current.position.y = 0.1 + Math.sin(elapsedTime * 1.8) * 0.06;

        // Auto rotation when enabled and not being actively dragged
        if (isRotating && !isDraggingRef.current) {
          bucketGroupRef.current.rotation.y += 0.005;
        }
      }

      // Animate Steam particles
      if (steamSystemRef.current && showSteam) {
        const positions = steamGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < steamParticleCount; i++) {
          const idx = i * 3;
          // Rise upward
          positions[idx + 1] += steamVelocities[i];
          // Gentle lateral drift
          positions[idx + 0] += Math.sin(elapsedTime * 2 + i) * 0.002;

          // Reset particle when it reaches top
          if (positions[idx + 1] > 2.8) {
            const r = Math.random() * 0.85;
            const theta = Math.random() * Math.PI * 2;
            positions[idx + 0] = Math.cos(theta) * r;
            positions[idx + 1] = 1.05 + Math.random() * 0.2;
            positions[idx + 2] = Math.sin(theta) * r;
          }
        }
        steamGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 12. Handle window resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      renderer.dispose();
      bucketTexture.dispose();
      biryaniTexture.dispose();
      steamTexture.dispose();
    };
  }, [bucketScale, isRotating, showSteam]);

  // Handle camera view transitions
  const setCameraView = (view: 'front' | 'top' | 'isometric') => {
    setActiveView(view);
    if (!cameraRef.current || !bucketGroupRef.current) return;

    if (view === 'front') {
      cameraRef.current.position.set(0, 1.2, 5.2);
      cameraRef.current.lookAt(0, 0.4, 0);
      bucketGroupRef.current.rotation.set(0, 0, 0);
    } else if (view === 'top') {
      cameraRef.current.position.set(0, 4.8, 3.2);
      cameraRef.current.lookAt(0, 0.6, 0);
      bucketGroupRef.current.rotation.set(0.2, 0, 0);
    } else {
      cameraRef.current.position.set(0, 2.5, 5.8);
      cameraRef.current.lookAt(0, 0.3, 0);
      bucketGroupRef.current.rotation.set(0.12, 0.4, 0);
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}>
      {/* ThreeJS Container */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[360px] md:min-h-[500px] cursor-grab active:cursor-grabbing flex items-center justify-center"
        title="Click and drag to rotate the 3D Biryani Bucket"
      />

      {/* Floating 3D Interactive Controls Pill */}
      <div className="absolute bottom-3 md:bottom-6 z-20 flex flex-wrap items-center justify-center gap-2 px-4 py-2 bg-neutral-900/80 backdrop-blur-md rounded-full border border-amber-500/30 shadow-2xl text-xs md:text-sm text-cream font-medium">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            isRotating
              ? 'bg-brand-red text-white shadow-md shadow-brand-red/40'
              : 'bg-neutral-800 text-neutral-300 hover:text-white'
          }`}
          title="Toggle 360° auto rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          <span>{isRotating ? 'Rotating' : 'Rotate'}</span>
        </button>

        <button
          onClick={() => setShowSteam(!showSteam)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            showSteam
              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/40'
              : 'bg-neutral-800 text-neutral-300 hover:text-white'
          }`}
          title="Toggle rising aroma steam"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>{showSteam ? 'Hot Steam ON' : 'Steam OFF'}</span>
        </button>

        <div className="h-4 w-[1px] bg-neutral-700 mx-1 hidden sm:block" />

        <div className="hidden sm:flex items-center gap-1">
          <button
            onClick={() => setCameraView('isometric')}
            className={`px-2.5 py-1 rounded-full text-xs transition-all ${
              activeView === 'isometric' ? 'bg-amber-400/20 text-gold font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            3D Angle
          </button>
          <button
            onClick={() => setCameraView('top')}
            className={`px-2.5 py-1 rounded-full text-xs transition-all ${
              activeView === 'top' ? 'bg-amber-400/20 text-gold font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Biryani View
          </button>
          <button
            onClick={() => setCameraView('front')}
            className={`px-2.5 py-1 rounded-full text-xs transition-all ${
              activeView === 'front' ? 'bg-amber-400/20 text-gold font-semibold' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Bucket Brand
          </button>
        </div>
      </div>

      {/* Interactive Helper Overlay Tooltip */}
      <div className="absolute top-3 right-4 z-10 pointer-events-none flex items-center gap-1.5 text-[11px] md:text-xs text-amber-200/80 bg-neutral-900/60 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-500/20">
        <Sparkles className="w-3 h-3 text-gold animate-pulse" />
        <span>Drag to rotate 3D bucket</span>
      </div>
    </div>
  );
};
