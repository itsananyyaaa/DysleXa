import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

function stringSimilarity(str1, str2) {
  str1 = str1.toLowerCase().trim();
  str2 = str2.toLowerCase().trim();
  let matches = 0;
  const len = Math.max(str1.length, str2.length);
  for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
    if (str1[i] === str2[i]) matches++;
  }
  return matches / len;
}

function Logic() {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [resultMsg, setResultMsg] = useState("📝 Ready to read!");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);

  const sentences = [
    "This is the first sentence the user must read.",
    "IBM Watson can convert speech to text easily.",
    "Learning AI helps improve accessibility for everyone.",
    "React is a popular library for building web apps.",
    "Face API can detect emotions from video streams.",
    "Speech recognition can aid dyslexic users effectively.",
    "This is the last sentence to complete the hackathon demo.",
  ];

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models"; // Ensure models are in public/models
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
      startCamera();
    };
    loadModels();
  }, []);

  // Start webcam with overlay
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      videoRef.current.srcObject = stream;

      videoRef.current.addEventListener("loadedmetadata", () => {
        videoRef.current.play();
      });

      videoRef.current.addEventListener("playing", () => {
        // Ensure canvasRef.current is available from the JSX rendering
        if (!canvasRef.current) {
          console.error("Canvas element not found!");
          return;
        }

        const displaySize = {
          width: videoRef.current.videoWidth,
          height: videoRef.current.videoHeight,
        };
        // Match dimensions of the canvas to the video element
        faceapi.matchDimensions(canvasRef.current, displaySize);

        setInterval(async () => {
          const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);
          const ctx = canvasRef.current.getContext("2d");
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas

          if (detections.length > 0) {
            const expr = Object.entries(detections[0].expressions).reduce((a, b) => (b[1] > a[1] ? b : a))[0];

            // Overlay expression on top-left corner of the webcam feed
            ctx.font = "24px Arial"; // Slightly larger for better visibility
            ctx.fillStyle = "red";
            ctx.fillText(expr.toUpperCase(), 10, 30); // Position within the video feed

            // Background color for sentence
            if (expr === "neutral") textRef.current.style.backgroundColor = "#ffebcd";
            else if (expr === "happy") textRef.current.style.backgroundColor = "#b6fcd5";
            else if (expr === "sad") textRef.current.style.backgroundColor = "#f7c6c7";
            else textRef.current.style.backgroundColor = "#ffffff";
          } else {
            // Optional: Clear expression text if no face is detected
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            textRef.current.style.backgroundColor = "#ffffff"; // Reset sentence background
          }
        }, 500);
      });
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  // STT functions (no changes here)
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.start();
    setIsListening(true);
    setResultMsg("🎤 Start reading the sentence!");

    let finalTranscript = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }
      setRecognizedText(finalTranscript + interimTranscript);
    };

    recognition.onend = async () => {
      setIsListening(false);
      const trimmedText = finalTranscript.trim();
      const similarity = stringSimilarity(trimmedText, sentences[currentSentenceIndex]);

      if (similarity < 0.85) {
        setResultMsg("❌ Struggling. AI will read aloud!");
        try {
          // TTS fetch from your server
          const res = await fetch("http://127.0.0.1:5500/check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              givenText: sentences[currentSentenceIndex],
              recognizedText: trimmedText,
            }),
          });
          if (res.headers.get("content-type")?.includes("audio/wav")) {
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
          }
        } catch (err) {
          console.error("Error fetching TTS:", err);
        }
      } else {
        setResultMsg("✅ Correct! You can move to next sentence.");
      }
    };
  };

  const stopListening = () => {
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsListening(false);
  };

  const nextSentence = () => {
    setCurrentSentenceIndex((prev) => (prev < sentences.length - 1 ? prev + 1 : 0));
    setRecognizedText("");
    setResultMsg("📝 Ready to read!");
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", position: "relative" }}>
      <h2>Read This Sentence Aloud:</h2>
      <p
        ref={textRef}
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {sentences[currentSentenceIndex]}
      </p>

      <button onClick={isListening ? stopListening : startListening}>{isListening ? "Stop Listening" : "Start Reading"}</button>
      <button onClick={nextSentence} style={{ marginLeft: "10px" }}>
        Next Sentence
      </button>

      <h3>Recognized Speech:</h3>
      <p>{recognizedText || "📝 You can start reading now!"}</p>

      <h3>Feedback:</h3>
      <p>{resultMsg}</p>

      <h3>Webcam:</h3>
      {/* This container will hold both the video and the canvas */}
      <div
        style={{
          position: "relative",
          width: "480px",
          height: "360px",
          margin: "0 auto",
          border: "2px solid #000",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          width="480"
          height="360"
          autoPlay
          muted
          style={{ display: "block", borderRadius: "8px", position: "absolute", top: 0, left: 0 }}
        ></video>
        {/* The canvas is now rendered directly within the same div */}
        <canvas
          ref={canvasRef}
          width="480" // Set canvas dimensions explicitly to match video
          height="360"
          style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}
        ></canvas>
      </div>
    </div>
  );
}

export default Logic;
