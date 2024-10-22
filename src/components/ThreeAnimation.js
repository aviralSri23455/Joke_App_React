import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function RotatingBox() {
  const mesh = useRef();
  const [color, setColor] = useState('teal');

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  const changeColor = () => {
    const colors = ['teal', 'purple', 'orange', 'pink'];
    setColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <Box ref={mesh} scale={2} onClick={changeColor} args={[1, 1, 1]}>
      <meshStandardMaterial color={color} />
    </Box>
  );
}

function ThreeAnimation() {
  return (
    <Canvas style={{ height: 400, marginBottom: '2rem' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 5, 5]} />
      <RotatingBox />
    </Canvas>
  );
}

export default ThreeAnimation;
