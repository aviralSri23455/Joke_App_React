import React, { useState, useEffect, useCallback } from 'react';
import { Box, Button, Center, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Header from './components/Header';
import JokeCard from './components/JokeCard';
import ThreeAnimation from './components/ThreeAnimation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MotionBox = motion(Box);
const MotionButton = motion(Button); // Create a motion version of Button

function App() {
  const [joke, setJoke] = useState('');
  const [bgColor, setBgColor] = useState('gray.100');

  // Function to change background gradient
  const changeBackground = () => {
    const gradients = [
      'linear(to-r, gray.300, blue.200, pink.200)',
      'linear(to-r, teal.300, green.200, yellow.200)',
      'linear(to-r, purple.300, blue.200, pink.200)',
      'linear(to-r, orange.300, red.200, yellow.200)',
    ];
    setBgColor(gradients[Math.floor(Math.random() * gradients.length)]);
  };

  // Fetch a new joke wrapped in useCallback
  const fetchJoke = useCallback(async () => {
    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.data.joke) {
        setJoke(response.data.joke);
        changeBackground();
        toast.success('New joke fetched!', { position: 'top-center', autoClose: 3000 });
      } else {
        toast.error('Failed to fetch a joke.', { position: 'top-center', autoClose: 3000 });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching the joke.', { position: 'top-center', autoClose: 3000 });
    }
  }, []);

  useEffect(() => {
    fetchJoke();
  }, [fetchJoke]);

  return (
    <Center h="100vh" flexDirection="column" bgGradient={bgColor} w="100vw">
      <Header />
      <Box width="100%" maxW="1200px" h="400px" mb={4}>
        <ThreeAnimation />
      </Box>
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        p={6}
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        shadow="2xl"
        mt={6}
        maxWidth="100%"
        w="100%"
      >
        <JokeCard joke={joke} />
        <MotionButton
          colorScheme="teal"
          mt={6}
          whileHover={{ scale: 1.1 }} // This prop can be used on MotionButton
          transition={{ duration: 0.2 }}
          onClick={fetchJoke}
        >
          Get Another Joke
        </MotionButton>
      </MotionBox>
      <ToastContainer />
    </Center>
  );
}

export default App;
