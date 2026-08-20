/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import lanyardImg from '../assets/lanyard.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1.2,
  anchorY = 4.8,
  anchorX = 0,
  cardScale = 2.25,
  className = ''
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`lanyard-wrapper ${className}`}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, antialias: true, preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            anchorY={anchorY}
            anchorX={anchorX}
            cardScale={cardScale}
          />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 1.2,
  anchorY = 4.8,
  anchorX = 0,
  cardScale = 2.25
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF('/card.glb');
  const texture = useTexture(lanyardImage || lanyardImg);
  
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap) return null;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    if (!baseImg) return baseMap;
    const W = baseImg.width || 1024;
    const H = baseImg.height || 1024;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect) => {
      if (!img || !img.width || !img.height) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex?.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex?.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials]);

  // Initial curve from anchor down to resting position
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(anchorX, anchorY - 3.0, 0),
        new THREE.Vector3(anchorX, anchorY - 2.0, 0),
        new THREE.Vector3(anchorX, anchorY - 1.0, 0),
        new THREE.Vector3(anchorX, anchorY, 0)
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => {
        document.body.style.cursor = 'auto';
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.05);

    // Self-healing bounds check to prevent physics explosion
    const checkAndReset = (ref, targetPos) => {
      const trans = ref.current?.translation();
      const vel = ref.current?.linvel();
      if (!trans || isNaN(trans.x) || Math.abs(trans.x) > 25 || Math.abs(trans.y) > 25 || (vel && isNaN(vel.x))) {
        ref.current?.setTranslation?.(targetPos, true);
        ref.current?.setLinvel?.({ x: 0, y: 0, z: 0 }, true);
        ref.current?.setAngvel?.({ x: 0, y: 0, z: 0 }, true);
        if (ref.current?.lerped) ref.current.lerped.copy(targetPos);
        return true;
      }
      return false;
    };

    checkAndReset(fixed, { x: anchorX, y: anchorY, z: 0 });
    checkAndReset(j1, { x: anchorX, y: anchorY - 0.8, z: 0 });
    checkAndReset(j2, { x: anchorX, y: anchorY - 1.6, z: 0 });
    checkAndReset(j3, { x: anchorX, y: anchorY - 2.4, z: 0 });
    checkAndReset(card, { x: anchorX, y: anchorY - 3.9, z: 0 });

    if (dragged && card.current) {
      // Calculate intersection of pointer ray with z = 0 plane
      const ray = state.raycaster.ray;
      if (Math.abs(ray.direction.z) > 0.0001) {
        const targetZ = 0;
        const distance = (targetZ - ray.origin.z) / ray.direction.z;
        const pointOnPlane = ray.origin.clone().add(ray.direction.clone().multiplyScalar(distance));

        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
        if (!isNaN(pointOnPlane.x) && !isNaN(dragged.x)) {
          card.current.setNextKinematicTranslation({
            x: pointOnPlane.x - dragged.x,
            y: pointOnPlane.y - dragged.y,
            z: targetZ
          });
        }
      }
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        const trans = ref.current.translation();
        if (!trans || isNaN(trans.x)) return;
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(trans);
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(trans)));
        const alpha = Math.min(1, Math.max(0, clampedDelta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))));
        ref.current.lerped.lerp(trans, alpha);
      });

      const p0 = j3.current.translation();
      const p1 = j2.current.lerped;
      const p2 = j1.current.lerped;
      const p3 = fixed.current.translation();

      if (p0 && p1 && p2 && p3 && !isNaN(p0.x) && !isNaN(p1.x) && !isNaN(p2.x) && !isNaN(p3.x)) {
        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);

        const pts = curve.getPoints(isMobile ? 16 : 32);
        if (pts && pts.length > 0 && pts.every((p) => !isNaN(p.x) && !isNaN(p.y) && !isNaN(p.z))) {
          band.current.geometry.setPoints(pts);
        }
      }

      const angVel = card.current.angvel();
      const cardRot = card.current.rotation();
      if (angVel && cardRot && !isNaN(angVel.x) && !isNaN(cardRot.y)) {
        const euler = new THREE.Euler().setFromQuaternion(
          new THREE.Quaternion(cardRot.x, cardRot.y, cardRot.z, cardRot.w),
          'YXZ'
        );
        card.current.setAngvel({
          x: angVel.x,
          y: angVel.y - euler.y * 0.25,
          z: angVel.z
        });
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[anchorX, anchorY, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -0.8, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.6, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -2.4, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[0, -3.9, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={cardScale}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.stopPropagation();
              try {
                e.target.releasePointerCapture(e.pointerId);
              } catch (_) {}
              drag(false);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              try {
                e.target.setPointerCapture(e.pointerId);
              } catch (_) {}
              const cardPos = card.current ? card.current.translation() : { x: 0, y: 0 };
              drag(new THREE.Vector3(e.point.x - cardPos.x, e.point.y - cardPos.y, 0));
            }}
          >
            {nodes?.card && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap || materials?.base?.map}
                  map-anisotropy={16}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.9}
                  metalness={0.8}
                />
              </mesh>
            )}
            {nodes?.clip && (
              <mesh
                geometry={nodes.clip.geometry}
                material={materials?.metal}
                material-roughness={0.3}
              />
            )}
            {nodes?.clamp && (
              <mesh geometry={nodes.clamp.geometry} material={materials?.metal} />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload('/card.glb');
