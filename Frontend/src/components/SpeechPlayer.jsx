import { useState, useRef, useEffect } from "react";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { RxDownload } from "react-icons/rx";

const SpeechPlayer = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioURL, setAudioURL] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const synth = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!synth.current) {
      console.error("SpeechSynthesis is not supported in this browser.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(message);
    utteranceRef.current = utterance;
    utteranceRef.current.volume = 1;

    // Assign a voice
    const updateVoices = () => {
      let voices = synth.current.getVoices();
      if (voices.length > 0) {
        utteranceRef.current.voice = voices.find(voice => voice.lang.includes("en")) || voices[0]; 
      } else {
        setTimeout( updateVoices, 100); // Retry until voices load
      }
    };

    updateVoices();
    synth.current.onvoiceschanged = updateVoices;

    // Handle speech completion
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      cancelAnimationFrame(animationRef.current);
    };

    // Track progress
    utterance.onboundary = (event) => {
      if (utterance.text.length > 0) {
        setProgress((event.charIndex / utterance.text.length) * 100);
      }
    };

  }, [message]);

  const resetSpeechSynthesis = () => {
    synth.current.cancel(); // Stop any stuck speech
    synth.current = window.speechSynthesis; // Reset speech engine
  };
  const toggleSpeech = () => {
    if (!synth.current) {
        resetSpeechSynthesis(); // Reset before trying to speak
      }
    if (synth.current.speaking && !synth.current.paused) {
      synth.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
      cancelAnimationFrame(animationRef.current); // Stop mover when paused
    } else if (isPaused) {
      synth.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      animateProgress(Date.now(), utteranceRef.current.text.length * 60);
    } else {
      synth.current.speak(utteranceRef.current);
      setIsPlaying(true);
      setIsPaused(false);
      animateProgress(Date.now(), utteranceRef.current.text.length * 60);
    }
  };
  
  const animateProgress = (startTime, duration) => {
    const update = () => {
      if (!synth.current.speaking) {
        cancelAnimationFrame(animationRef.current);  // Reset when speech stops
        return;
      }
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
  
      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(update);
      }
    };
    animationRef.current = requestAnimationFrame(update);
  };
  

  const downloadAudio = () => {
    const blob = new Blob([message], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  return (
    <div className="px-1 py-1 mt-3 flex border border-black rounded-xl items-center">
      <div className="flex gap-4 m-1">
        <button className="px-4 py-2 rounded-md" onClick={toggleSpeech}>
          {isPlaying ? <FaCirclePause className="size-6" /> : <FaCirclePlay className="size-6" />}
        </button>
      </div>
      <div className="relative w-[65vw] h-1 bg-gray-300 rounded-full mt-2">
        <div className="absolute top-0 left-0 h-1 bg-orange-400 rounded-full" style={{ width: `${progress}%` }}></div>
        <div className="absolute bottom-[-5px] w-4 h-4 bg-orange-500 rounded-full transition-none" style={{ left: `${progress}%` }}></div>
      </div>
      <a href={audioURL} download="speech.txt" className="px-2 text-black font-bold justify-center items-center hover:bg-slate-400 py-2 flex ml-5 text-sm cursor-pointer rounded-md" onClick={downloadAudio}>
        <RxDownload className="size-6" /> Download
      </a>
    </div>
  );
};

export default SpeechPlayer;
