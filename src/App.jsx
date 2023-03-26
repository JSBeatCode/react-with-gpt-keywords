import React, { useState } from 'react'
import { Container, Box } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from './components/Footer';
import TextInput from './components/TextInput';
import KeywordsModel from './components/KeywordsModel';

const App = () => {
  const [ keywords, setKeywords ] = useState('');
  const [ isOpen, setIsOpen ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  const extractKeywords = async (text) => {
    setLoading(true);
    setIsOpen(true);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}` // my open ai api key
      },
      body: JSON.stringify({
        model: 'text-davinci-003', // one type of gpt models. you can use many different models and their list can be found in open ai api website
        prompt: 'Extract keywords from this text. Make the first letter of each word uppercase and separate with commas \n\n' + text + '', // order to ai
        temperature: 0.5, // radomness. if it goes high, ai will generate more diverse results. 0 to 1.
        max_tokens: 60, // the number of words that are returned back from
        frequency_penalty: 0.8 // higher it is more it discourages generation of repeated phrases or words. 
      })
    }

    const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);

    const json = await response.json();

    const data = json.choices[0].text.trim();

    console.log(data);

    setKeywords(data);
    setLoading(false);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <Box bg = 'blue.600' color='white' height='100%' paddingTop={130}>
      <Container maxW='3xl' centerContent>
        <Header />
        <TextInput extractKeywords = {extractKeywords} />
        <Footer />
      </Container>
      <KeywordsModel 
        keywords={keywords} 
        loading={loading} 
        isOpen={isOpen} 
        closeModal={closeModal} 
      />
    </Box>
  )
}

export default App 