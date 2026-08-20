'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';

// --- Lemniscate of Bernoulli Curve (3D Infinity Symbol) ---
class InfinityCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    const theta = t * Math.PI * 2;
    const x = (this.scale * Math.cos(theta)) / (1 + Math.sin(theta) * Math.sin(theta));
    const y = (this.scale * Math.sin(theta) * Math.cos(theta)) / (1 + Math.sin(theta) * Math.sin(theta));
    const z = (this.scale * 0.5) * Math.sin(theta);
    return optionalTarget.set(x, y, z);
  }
}

// --- Scratch Vectors for garbage-collection free animation loop ---
const UP_VECTOR = new THREE.Vector3(0, 1, 0);
const FOCUS_POS = new THREE.Vector3(0, 0, 14);
const FOCUS_EULER = new THREE.Euler(0, 0, 0);
const START_CENTER = new THREE.Vector3(0, 0, -50);
const MIN_SCALE = new THREE.Vector3(0.1, 0.1, 0.1);

// Generate high-resolution canvas card texture for tech tools
function createToolTexture(name, icon, bgHex, textColorHex = '#ffffff') {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background rounded card
  const r = 48;
  const x = 24, y = 24, w = 464, h = 464;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();

  ctx.fillStyle = '#0f0f14';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.stroke();

  // Icon Badge Box
  const bw = 130, bh = 130, br = 32;
  const bx = (512 - bw) / 2;
  const by = 100;

  ctx.beginPath();
  ctx.moveTo(bx + br, by);
  ctx.arcTo(bx + bw, by, bx + bw, by + bh, br);
  ctx.arcTo(bx + bw, by + bh, bx, by + bh, br);
  ctx.arcTo(bx, by + bh, bx, by, br);
  ctx.arcTo(bx, by, bx + bw, by, br);
  ctx.closePath();

  ctx.fillStyle = bgHex;
  ctx.fill();

  // Icon Text inside Badge
  ctx.font = '900 48px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = textColorHex;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(icon, 256, by + bh / 2 + 2);

  // Dotted Line Separator
  ctx.beginPath();
  ctx.setLineDash([6, 6]);
  ctx.moveTo(216, 285);
  ctx.lineTo(296, 285);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.setLineDash([]);

  // Label Text
  ctx.font = '800 24px system-ui, -apple-system, sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.toUpperCase(), 256, 355);

  return canvas.toDataURL('image/png');
}

const DEFAULT_TOOLS = [
  { name: 'JavaScript', icon: 'JS', bg: '#f7df1e', color: '#000000' },
  { name: 'TypeScript', icon: 'TS', bg: '#3178c6', color: '#ffffff' },
  { name: 'Express.js', icon: 'ex', bg: '#252529', color: '#ffffff' },
  { name: 'Spring Boot', icon: 'SB', bg: '#6db33f', color: '#ffffff' },
  { name: 'PySpark', icon: 'PS', bg: '#e25a1c', color: '#ffffff' },
  { name: 'Supabase', icon: 'S', bg: '#3ecf8e', color: '#000000' },
  { name: 'OpenAI', icon: 'O', bg: '#ffffff', color: '#000000' },
  { name: 'Git', icon: 'Git', bg: '#f05032', color: '#ffffff' },
  { name: 'Linux', icon: 'L', bg: '#f8b700', color: '#000000' },
  { name: 'GCP', icon: 'GCP', bg: '#4285f4', color: '#ffffff' },
  { name: 'Postman', icon: 'PM', bg: '#ff6c37', color: '#ffffff' },
  { name: 'Docker', icon: 'D', bg: '#2496ed', color: '#ffffff' },
  { name: 'React', icon: 'R', bg: '#61dafb', color: '#000000' },
  { name: 'PostgreSQL', icon: 'PG', bg: '#4169e1', color: '#ffffff' },
  { name: 'MongoDB', icon: 'M', bg: '#47a248', color: '#ffffff' }
];

const Card = ({
  url,
  positionAt,
  curve,
  index,
  total,
  scrollOffset,
  hovered,
  setHovered,
  selected,
  setSelected,
  interactive = true,
  animProgress,
  expansion
}) => {
  const meshRef = useRef(null);
  const texture = useTexture(url);

  const transition = useRef(0);
  const hoverScale = useRef(1);

  const scratch = useMemo(
    () => ({
      point: new THREE.Vector3(),
      tangent: new THREE.Vector3(),
      loopQuaternion: new THREE.Quaternion(),
      mat: new THREE.Matrix4(),
      scaleVec: new THREE.Vector3(),
      startPoint: new THREE.Vector3(),
      startTangent: new THREE.Vector3(),
      startQuaternion: new THREE.Quaternion(),
      focusQuaternion: new THREE.Quaternion().setFromEuler(FOCUS_EULER),
      focusScale: new THREE.Vector3(),
      tempVec: new THREE.Vector3()
    }),
    []
  );

  useFrame(() => {
    if (!meshRef.current) return;

    const isSelected = selected === index;
    const targetTransition = isSelected ? 1 : 0;
    transition.current = THREE.MathUtils.lerp(transition.current, targetTransition, 0.1);

    const targetHoverScale = interactive && hovered === index && !isSelected ? 1.25 : 1;
    hoverScale.current = THREE.MathUtils.lerp(hoverScale.current, targetHoverScale, 0.1);

    const basePosition = index / total;
    let t = (basePosition + scrollOffset.current) % 1;
    if (t < 0) t += 1;

    curve.getPoint(t, scratch.point);

    const zInfluence = THREE.MathUtils.smoothstep(scratch.point.z, -2, 5);
    const expansionFactor = 1 + (expansion.current / curve.scale) * zInfluence;
    scratch.point.multiplyScalar(expansionFactor);

    const tangent = curve.getTangent(t).normalize();

    scratch.tempVec.copy(scratch.point).add(tangent);
    scratch.mat.lookAt(scratch.point, scratch.tempVec, UP_VECTOR);
    scratch.loopQuaternion.setFromRotationMatrix(scratch.mat);

    const zNorm = (scratch.point.z + curve.scale * 0.5) / curve.scale;
    const scaleBase = 1 + zNorm * 1.5;
    const loopTargetScale = scaleBase * hoverScale.current;
    const loopScale = scratch.scaleVec.set(3.4, 3.4, 1).multiplyScalar(loopTargetScale * 0.40);

    const focusScale = scratch.focusScale.set(4.8, 4.8, 1);

    const p = animProgress.current;
    const ease = 1 - Math.pow(1 - p, 4);

    const startAngle = t * Math.PI * 2;
    scratch.startPoint.set(
      START_CENTER.x + Math.cos(startAngle) * 4,
      START_CENTER.y + Math.sin(startAngle) * 4,
      START_CENTER.z + Math.sin(startAngle * 3) * 5
    );

    scratch.startTangent
      .set(-Math.sin(startAngle), Math.cos(startAngle), Math.cos(startAngle * 3))
      .normalize();

    scratch.tempVec.copy(scratch.startPoint).add(scratch.startTangent);
    scratch.mat.lookAt(scratch.startPoint, scratch.tempVec, UP_VECTOR);
    scratch.startQuaternion.setFromRotationMatrix(scratch.mat);

    if (transition.current < 0.001) {
      meshRef.current.position.lerpVectors(scratch.startPoint, scratch.point, ease);
      meshRef.current.quaternion.slerpQuaternions(scratch.startQuaternion, scratch.loopQuaternion, ease);
      meshRef.current.scale.lerpVectors(MIN_SCALE, loopScale, ease);

      meshRef.current.renderOrder = 0;
      if (meshRef.current.material) {
        meshRef.current.material.depthTest = true;
        meshRef.current.material.depthWrite = true;
      }
    } else {
      meshRef.current.position.lerpVectors(scratch.point, FOCUS_POS, transition.current);
      meshRef.current.quaternion.slerpQuaternions(scratch.loopQuaternion, scratch.focusQuaternion, transition.current);
      meshRef.current.scale.lerpVectors(loopScale, focusScale, transition.current);

      if (transition.current > 0.1) {
        meshRef.current.renderOrder = 999;
        if (meshRef.current.material) {
          meshRef.current.material.depthTest = false;
          meshRef.current.material.depthWrite = false;
        }
      } else {
        meshRef.current.renderOrder = 0;
        if (meshRef.current.material) {
          meshRef.current.material.depthTest = true;
          meshRef.current.material.depthWrite = true;
        }
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        setHovered(index);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        if (!interactive) return;
        setHovered(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        if (!interactive) return;
        e.stopPropagation();
        setSelected(selected === index ? null : index);
      }}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent />
    </mesh>
  );
};

const Scene = ({ items, baseSpeed, radius, interactive = true, weight = 4, impact = 1.2 }) => {
  const curve = useMemo(() => new InfinityCurve(radius), [radius]);
  const scrollOffset = useRef(0);
  const scrollVelocity = useRef(baseSpeed);
  const targetVelocity = useRef(baseSpeed);
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  const isDragging = useRef(false);
  const previousPointer = useRef(0);

  const scrollTarget = useRef(0);
  const lastScrollOffset = useRef(0);

  const expansion = useRef(0);
  const expansionVelocity = useRef(0);

  const animProgress = useRef(0);

  const dragDamping = useMemo(() => 0.08 / Math.max(weight * 0.5, 0.1), [weight]);
  const sensitivity = useMemo(() => 0.0012 / Math.max(weight * 0.5, 0.1), [weight]);
  const friction = useMemo(() => 0.05 / Math.max(weight * 0.8, 0.1), [weight]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);

    if (animProgress.current < 1) {
      animProgress.current += dt * 0.5;
      if (animProgress.current > 1) animProgress.current = 1;
    }

    const speed = Math.abs(scrollVelocity.current);
    const targetExpansion = Math.min(speed * 3 * impact, 5 * impact);

    const k = 80;
    const c = 8;
    const force = (targetExpansion - expansion.current) * k - expansionVelocity.current * c;
    expansionVelocity.current += force * dt;
    expansion.current += expansionVelocity.current * dt;

    if (isDragging.current) {
      scrollOffset.current = THREE.MathUtils.lerp(scrollOffset.current, scrollTarget.current, dragDamping);
      const change = scrollOffset.current - lastScrollOffset.current;
      if (dt > 0.001) {
        const instantVelocity = (change / dt) * 10;
        scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, instantVelocity, 0.5);
      }
      targetVelocity.current = baseSpeed;
    } else {
      scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, targetVelocity.current, friction);
      scrollOffset.current += scrollVelocity.current * dt * 0.1;

      const destinationSpeed = interactive && hovered !== null ? baseSpeed * 0.05 : baseSpeed;
      if (Math.abs(targetVelocity.current - destinationSpeed) > 0.001) {
        targetVelocity.current = THREE.MathUtils.lerp(targetVelocity.current, destinationSpeed, 0.02);
      } else {
        targetVelocity.current = destinationSpeed;
      }
    }

    lastScrollOffset.current = scrollOffset.current;
  });

  const { gl } = useThree();

  useEffect(() => {
    if (!interactive) return;
    const canvas = gl.domElement;

    const handleWheel = (e) => {
      const speed = e.deltaY * 0.0005;
      scrollVelocity.current += speed;
      targetVelocity.current = baseSpeed + speed * 2;
    };

    const handlePointerDown = (e) => {
      isDragging.current = true;
      previousPointer.current = e.clientX;
      scrollTarget.current = scrollOffset.current;
    };

    const handlePointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointer.current;
      previousPointer.current = e.clientX;
      scrollTarget.current -= deltaX * sensitivity;
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gl, baseSpeed, sensitivity, interactive]);

  return (
    <group>
      {items.map((item, i) => (
        <Card
          key={i}
          url={item.image}
          index={i}
          total={items.length}
          curve={curve}
          positionAt={i / items.length}
          scrollOffset={scrollOffset}
          hovered={hovered}
          setHovered={setHovered}
          selected={selected}
          setSelected={setSelected}
          interactive={interactive}
          animProgress={animProgress}
          expansion={expansion}
        />
      ))}
    </group>
  );
};

export default function InfinityScrollShowcase({
  speed = 0.85,
  radius = 8,
  interactive = true,
  weight = 4,
  impact = 1.2
}) {
  const items = useMemo(() => {
    return DEFAULT_TOOLS.map((t) => ({
      image: createToolTexture(t.name, t.icon, t.bg, t.color)
    }));
  }, []);

  return (
    <div className="w-full h-full relative overflow-hidden bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 22], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <React.Suspense fallback={null}>
          <Scene
            items={items}
            baseSpeed={speed}
            radius={radius}
            interactive={interactive}
            weight={weight}
            impact={impact}
          />
        </React.Suspense>
      </Canvas>

      {interactive && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white/60">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Drag or Scroll to spin 3D Toolkit Loop</span>
        </div>
      )}
    </div>
  );
}
