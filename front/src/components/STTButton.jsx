import { useState, useRef } from "react";
import Button from "./Button";

const STTButton = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleStart = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("STT is only supported in the Chrome browser.");
      return;
    }

    if (!recognitionRef.current) {
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
    }

    recognitionRef.current.start();
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isListening}
      backgroundColor={isListening ? "#ccc" : "#448efe"}
      hoverColor={isListening ? "#ccc" : "#3077e2"}
    >
      {isListening ? "🎙️ Listening..." : "🎤 Start Voice Input"}
    </Button>
  );
};

export default STTButton;
