"use client";

import {
  Float,
  OrbitControls,
  PerspectiveCamera,
  useScroll,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";

import * as THREE from "three";

import Loader from "./Loader";
import SpaceShip from "./SpaceShip";

import helvetikerFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import Asteroids from "./Asteroids";
import Background from "./Background";
import Planets from "./Planets";

const NB_POINTS = 10000;

const InsideCanvas = () => {
  const textMeshRef = useRef();
  const cameraRef = useRef();
  const spaceShipRef = useRef();
  const orbitControlsRef = useRef();

  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (cameraRef.current && spaceShipRef.current && orbitControlsRef.current) {
      orbitControlsRef.current.enabled = false; // Disable during animation
      const curPointIndex = Math.min(
        Math.round(scroll.offset * linePoints.length),
        linePoints.length - 1
      );

      const curPoint = linePoints[curPointIndex];
      const pointAhead =
        linePoints[(Math.min(curPointIndex + 1), linePoints.length - 1)];

      const xDelta = (pointAhead.x - curPoint.x) * 80;

      const angleRotation =
        (xDelta < 0 ? 1 : -1) * Math.min(Math.abs(xDelta), Math.PI / 3);

      const targetQuaternionShip = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          spaceShipRef.current.rotation.x,
          spaceShipRef.current.rotation.y,
          angleRotation
        )
      );

      spaceShipRef.current.quaternion.slerp(targetQuaternionShip, delta * 2);
      cameraRef.current.position.lerp(curPoint, delta * 24);

        // orbitControlsRef.current.enabled = true;
    }
  });

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(
      [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, -10),
        new THREE.Vector3(-2, 0, -20),
        new THREE.Vector3(-3, 0, -30),
        new THREE.Vector3(0, 0, -40),
        new THREE.Vector3(5, 0, -50),
        new THREE.Vector3(7, 0, -60),
        new THREE.Vector3(5, 0, -70),
        new THREE.Vector3(0, 0, -80),
        new THREE.Vector3(0, 0, -90),
        new THREE.Vector3(0, 0, -100),
        new THREE.Vector3(0, 0, -110),
        new THREE.Vector3(-2, 0, -120),
        new THREE.Vector3(-3, 0, -130),
        new THREE.Vector3(0, 0, -140),
        new THREE.Vector3(5, 0, -150),
        new THREE.Vector3(7, 0, -160),
        new THREE.Vector3(5, 0, -170),
        new THREE.Vector3(0, 0, -180),
        new THREE.Vector3(0, 0, -190),
        new THREE.Vector3(0, 0, -200),
        new THREE.Vector3(0, 0, -210),
        new THREE.Vector3(-2, 0, -220),
        new THREE.Vector3(-3, 0, -230),
        new THREE.Vector3(0, 0, -240),
        new THREE.Vector3(5, 0, -250),
        new THREE.Vector3(7, 0, -260),
        new THREE.Vector3(5, 0, -270),
        new THREE.Vector3(0, 0, -280),
        new THREE.Vector3(0, 0, -290),
        new THREE.Vector3(0, 0, -300),
        new THREE.Vector3(0, 0, -310),
        new THREE.Vector3(-2, 0, -320),
        new THREE.Vector3(-3, 0, -330),
        new THREE.Vector3(0, 0, -340),
        new THREE.Vector3(5, 0, -350),
        new THREE.Vector3(7, 0, -360),
        new THREE.Vector3(5, 0, -370),
        new THREE.Vector3(0, 0, -380),
        new THREE.Vector3(0, 0, -390),
        new THREE.Vector3(0, 0, -400),
        new THREE.Vector3(0, 0, -400),
        new THREE.Vector3(0, 0, -410),
        new THREE.Vector3(-2, 0, -420),
        new THREE.Vector3(-3, 0, -430),
        new THREE.Vector3(0, 0, -440),
        new THREE.Vector3(5, 0, -450),
        new THREE.Vector3(7, 0, -460),
        new THREE.Vector3(5, 0, -470),
        new THREE.Vector3(0, 0, -480),
        new THREE.Vector3(0, 0, -490),
        new THREE.Vector3(0, 0, -500),
      ],
      false,
      "catmullrom",
      0.5
    );
  });

  const linePoints = useMemo(() => {
    return curve.getPoints(NB_POINTS);
  }, [curve]);

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.2);
    shape.lineTo(0, 0.2);

    return shape;
  }, [curve]);

  useEffect(() => {
    const font = new FontLoader().parse(helvetikerFont);
    const lines = [
      "Our Solar System is a collection of planets,",
      "moons, asteroids, comets, and other celestial bodies",
      "orbiting our Sun. It includes eight major planets,",
      "with Earth as the only known habitable one,",
      "and extends through the Kuiper Belt",
      "to the distant Oort Cloud.",
    ];

    lines.forEach((line, index) => {
      const textGeometry = new TextGeometry(line, {
        font: font,
        size: 1,
        height: 0.5,
        curveSegments: 12,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ color: "white" });
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Position each line with some spacing (e.g., 1.2 units apart)
      textMesh.position.set(-20, 2 - index * 1.2, -20);
      textMesh.rotation.y += 0.2;

      if (textMeshRef.current) {
        textMeshRef.current.add(textMesh);
      }
    });
  }, []);

  return (
    <>
      <group>
        <Suspense fallback={<Loader />}>
          <group ref={cameraRef}>
            <PerspectiveCamera
              position={[0, 3, 8]}
              rotation={[-0.2, 0, 0]}
              fov={30}
              makeDefault
            />
            <Background />
            <group ref={spaceShipRef}>
              <Float floatIntensity={2} speed={2}>
                <SpaceShip rotation-y={Math.PI} scale={0.2} position-y={0.1} />
              </Float>
            </group>
          </group>
          <group position={[-3, 0, -20]} ref={textMeshRef}></group>
          <group position-y={-2}>
            <mesh>
              <extrudeGeometry
                args={[
                  shape,
                  {
                    steps: NB_POINTS,
                    bevelEnabled: false,
                    extrudePath: curve,
                  },
                ]}
              />
              <meshStandardMaterial color="white" opacity={0.7} transparent />
            </mesh>
          </group>

          <Asteroids />

          <Planets />
        </Suspense>
      </group>

      <OrbitControls
        ref={orbitControlsRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
};

export default InsideCanvas;
