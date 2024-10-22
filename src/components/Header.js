import React, { useEffect, useRef } from 'react';
import { Heading, Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const MotionHeading = motion(Heading);
const MotionText = motion(Text);

function Header() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Add a rotating box
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add lighting
    const light = new THREE.AmbientLight(0x404040); // Soft white light
    scene.add(light);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <Box textAlign="center" mb={10}>
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }} />
      <MotionHeading
        fontSize={{ base: "3xl", md: "5xl" }} // Responsive font size
        bgGradient="linear(to-r, teal.300, blue.500, purple.500)"
        bgClip="text"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        color="transparent"
      >
        Random Joke Generator
      </MotionHeading>
      <MotionText
        fontSize={{ base: "md", md: "lg" }} // Responsive font size
        color="gray.600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        Click the button to fetch a hilarious joke!
      </MotionText>
    </Box>
  );
}

export default Header;
