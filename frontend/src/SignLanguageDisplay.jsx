import React from "react";
import styled from "styled-components";

// Mapping of words to sign language images or animations
const signLanguageMappings = {
  "hello": "/path/to/hello-sign.png",
  "doctor": "/path/to/doctor-sign.png",
  "pain": "/path/to/pain-sign.png",
  "medication": "/path/to/medication-sign.png",
  // Add more words as needed
};

const SignLanguageDisplay = ({ word }) => {
  const signImage = signLanguageMappings[word.toLowerCase()];

  return (
    <Container>
      {signImage ? (
        <img src={signImage} alt={`Sign language for ${word}`} />
      ) : (
        <p>No sign available for this word.</p>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  img {
    max-width: 150px; /* Adjust the size as necessary */
    height: auto;
  }
`;

export default SignLanguageDisplay;
