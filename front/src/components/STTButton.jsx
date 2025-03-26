import { useState, useRef } from "react";
import Button from "./Button";

const STTButton = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "ko-KR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error("STT error:", event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  };

  const handleToggle = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("STT is only supported in the Chrome browser.");
      return;
    }

    if (!recognitionRef.current) {
      initRecognition();
    }

    const recognition = recognitionRef.current;

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <Button
      onClick={handleToggle}
      backgroundColor={isListening ? "#f5535e" : "#448efe"}
      hoverColor={isListening ? "#dd434e" : "#3077e2"}
    >
      {isListening ? "🛑 Stop Listening" : "🎤 Start Voice Input"}
    </Button>
  );
};

export default STTButton;
