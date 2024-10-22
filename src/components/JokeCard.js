import { Text, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const MotionBox = motion(Box);

const colors = [
  "linear(to-r, blue.200, purple.300)",
  "linear(to-r, green.200, teal.300)",
  "linear(to-r, pink.200, orange.300)",
  "linear(to-r, red.200, yellow.300)",
];

function JokeCard({ joke }) {
  const [rotate, setRotate] = useState(false);
  const [bgColor, setBgColor] = useState(colors[0]);

  // Change color every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgColor((prev) => {
        const currentIndex = colors.indexOf(prev);
        return colors[(currentIndex + 1) % colors.length];
      });
    }, 3000); // Change color every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <MotionBox
      width="16rem" // Fixed width control
      bgGradient={bgColor} // Gradient background changes automatically
      borderRadius="md"
      p={6}
      shadow="lg"
      textAlign="center"
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }} // Slight lift and scale on hover
      whileTap={{ rotate: 360 }} // 360-degree rotation on click
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onClick={() => setRotate(!rotate)} // Toggle rotation state
      cursor="pointer"
      className={`joke-card ${rotate ? 'rotate' : ''}`} // CSS class to trigger shine effect
    >
      <Text
        fontSize="xl"
        color="gray.700"
        className="shine-text" // Shine effect on text hover
      >
        {joke}
      </Text>

      {/* Decorative element with bounce animation */}
      <MotionBox
        position="absolute"
        top={-3}
        right={-3}
        bg="yellow.400"
        borderRadius="full"
        size="1rem"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
    </MotionBox>
  );
}

export default JokeCard;

// Additional CSS for next-level animations
<style jsx>{`
  .joke-card {
    position: relative;
    overflow: hidden;
    transition: background 0.5s ease-in-out;
  }

  .joke-card:hover {
    background-image: linear-gradient(to right, #ff7e5f, #feb47b); /* Gradient appears on hover */
  }

  .joke-card:hover .shine-text {
    background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.1) 100%);
    -webkit-background-clip: text;
    color: transparent;
    animation: shine 1s linear infinite;
  }

  @keyframes shine {
    0% {
      background-position: -200%;
    }
    100% {
      background-position: 200%;
    }
  }

  .rotate {
    transform: rotateY(360deg); /* 360-degree rotation on click */
  }
`}</style>
