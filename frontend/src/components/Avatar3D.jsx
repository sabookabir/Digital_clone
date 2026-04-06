import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron } from '@react-three/drei';
import { useRef } from 'react';

function AnimatedCore() {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = time * 0.1;
    innerRef.current.rotation.y = time * -0.2;
  });

  return (
    <group>
      <Icosahedron ref={meshRef} args={[2, 1]}>
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.3} />
      </Icosahedron>
      <Icosahedron ref={innerRef} args={[1.2, 2]}>
        <meshStandardMaterial color="#6366f1" roughness={0.3} metalness={0.8} />
      </Icosahedron>
    </group>
  );
}

function Avatar3D() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#3b82f6" intensity={2} />
        <AnimatedCore />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

export default Avatar3D;
