import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUserMd, FaPhone, FaPhoneSlash } from "react-icons/fa";
import { useSpeechSynthesis } from "react-speech-kit";

// Sample doctor data
const doctors = [
  { id: 1, name: "Dr. John Doe", specialization: "Cardiologist", phone: "+123-456-7890" },
  { id: 2, name: "Dr. Jane Smith", specialization: "Neurologist", phone: "+987-654-3210" },
];

const DoctorsPage = () => {
  const [calling, setCalling] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { speak } = useSpeechSynthesis();

  // Dummy transcript and listening state for simulation
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!listening && transcript) {
      handleVoiceCommand(transcript.toLowerCase());
    }
  }, [transcript, listening]);

  // Handle voice commands for blind people
  const handleVoiceCommand = (command) => {
    if (command.includes("doctors")) {
      // If the command is about doctors, read out the available doctors
      let doctorNames = doctors.map((doc) => doc.name).join(", ");
      speak({ text: `The available doctors today are: ${doctorNames}` });
    } else if (command.includes("call")) {
      // Handle the voice command to call a specific doctor
      const doctorToCall = getDoctorFromCommand(command);
      if (doctorToCall) {
        startCall(doctorToCall);
      } else {
        speak({ text: "Sorry, I couldn't find the doctor you want to call." });
      }
    } else if (command.includes("cut") || command.includes("end")) {
      // Handle cut call command
      handleCutCall();
    }
  };

  // Function to extract doctor's name from the command
  const getDoctorFromCommand = (command) => {
    const lowerCaseCommand = command.toLowerCase();
    return doctors.find((doc) => lowerCaseCommand.includes(doc.name.toLowerCase()));
  };

  // Start call
  const startCall = (doctor) => {
    setSelectedDoctor(doctor);
    setCalling(true);
    speak({ text: `Calling ${doctor.name}` });
  };

  // Cut call and reset
  const handleCutCall = () => {
    setCalling(false);
    setSelectedDoctor(null);
    speak({ text: "Call was dropped. Returning to the doctor list." });
    setTranscript(""); // Reset transcript
  };

  return (
    <Container>
      {!calling ? (
        <>
          <h1>Doctors Available</h1>
          <DoctorsList>
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id}>
                <DoctorInfo>
                  <FaUserMd size={40} />
                  <div>
                    <h3>{doctor.name}</h3>
                    <p>Specialization: {doctor.specialization}</p>
                    <p>Phone: {doctor.phone}</p>
                  </div>
                </DoctorInfo>
                <CallButton onClick={() => startCall(doctor)}>
                  <FaPhone size={20} />
                </CallButton>
              </DoctorCard>
            ))}
          </DoctorsList>
          <VoiceControlSection>
            <button onClick={() => {
              setListening(true);
              setTranscript(""); // Reset transcript
              // Start listening (for simulation purposes)
              setTimeout(() => {
                setListening(false);
                setTranscript("call Dr. John Doe"); // Simulated voice command
              }, 3000);
            }}>
              Start Voice Control
            </button>
            <button onClick={() => {
              setListening(false);
            }}>
              Stop Voice Control
            </button>
            {listening && <p>Listening for commands...</p>}
            <p>Command: {transcript}</p>
          </VoiceControlSection>
        </>
      ) : (
        <CallingSection>
          <h2>Calling {selectedDoctor.name}...</h2>
          <p>Specialization: {selectedDoctor.specialization}</p>
          <FaPhoneSlash size={60} color="red" />
          <CutCallButton onClick={handleCutCall}>Cut Call</CutCallButton>
        </CallingSection>
      )}
    </Container>
  );
};

// Styled components for styling the elements
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const DoctorsList = styled.div`
  display: flex;
  gap: 20px;
`;

const DoctorCard = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  width: 300px;
  justify-content: space-between;
`;

const DoctorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CallButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CallingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const CutCallButton = styled.button`
  background-color: #ff3333;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff6666;
  }
`;

const VoiceControlSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  & > button {
    padding: 10px;
    margin: 5px;
    border: none;
    background-color: #333;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
`;

export default DoctorsPage;



