"use client";

import { Float, PerspectiveCamera, Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";

import * as THREE from "three";

import Asteroid from "./Asteroid";
import Background from "./Background";
import Loader from "./Loader";
import SpaceShip from "./SpaceShip";

const NB_POINTS = 10000;

const InsideCanvas = () => {
  const cameraRef = useRef();
  const spaceShipRef = useRef();
  const scroll = useScroll();

  useFrame((_state, delta) => {
    if (cameraRef.current && spaceShipRef.current) {
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

  const generateRandomXY = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const zPositions = Array.from({ length: 10 }, (_, i) => -10 * (2 * (i + 1)));

  const asteroidPositions = zPositions.map((z) => [
    generateRandomXY(-20, 20),
    generateRandomXY(-5, 5),
    z,
  ]);

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

          <group position={[-3, 0, -20]}>
            <Text></Text>
          </group>

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

          {asteroidPositions.map((position, index) => (
            <RandomAsteroid key={index} position={position} />
          ))}
        </Suspense>
      </group>
    </>
  );
};

export default InsideCanvas;

const RandomAsteroid = ({ position }) => {
  return (
    <Asteroid
      scale={[
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
      ]}
      rotation={[
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
        Math.random() / 2 + 0.5,
      ]}
      position={position}
    />
  );
};
