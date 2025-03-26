import { useState, useRef } from "react";
import Button from "./Button";

const STTButton = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const isStoppingRef = useRef(false);
  const retryTimeoutRef = useRef(null);

  const initRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "ko-KR";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;

    recognition.onstart = () => {
      setIsListening(true);
      isStoppingRef.current = false;
    };

    recognition.onend = () => {
      setIsListening(false);

      // 마이크 끄는 중이 아니면 재시도
      if (!isStoppingRef.current) {
        // 500ms 정도 대기 후 재시작 (안정성 확보)
        retryTimeoutRef.current = setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.error("STT auto-restart failed:", error);
          }
        }, 500);
      }
    };

    recognition.onresult = (event) => {
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalText += result[0].transcript;
        }
      }

      if (finalText && onResult) {
        onResult(finalText);
      }
    };

    recognition.onerror = (event) => {
      console.error("STT error:", event.error);
      setIsListening(false);

      // 자동 재시작 가능한 오류만 재시도
      if (
        !isStoppingRef.current &&
        ["no-speech", "audio-capture", "network"].includes(event.error)
      ) {
        retryTimeoutRef.current = setTimeout(() => {
          try {
            recognition.start();
          } catch (error) {
            console.error("Retry error:", error);
          }
        }, 1000);
      }
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
      isStoppingRef.current = true;
      clearTimeout(retryTimeoutRef.current);
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (error) {
        console.error("start() error:", error);
      }
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
