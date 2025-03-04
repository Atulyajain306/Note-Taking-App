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
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);
  const lastCharIndex = useRef(0);

  useEffect(() => {
    if (!synth.current) {
      console.error("SpeechSynthesis is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utteranceRef.current = utterance;
    utterance.volume = 1;

    // Assign a voice
    const updateVoices = () => {
      let voices = synth.current.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices.find(voice => voice.lang.includes("en")) || voices[0];
      } else {
        setTimeout(updateVoices, 100);
      }
    };

    updateVoices();
    synth.current.onvoiceschanged = updateVoices;

    // When speech ends
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      resetProgress();
    };

    // Track progress
    utterance.onboundary = (event) => {
      lastCharIndex.current = event.charIndex;
      if (utterance.text.length > 0) {
        setProgress((event.charIndex / utterance.text.length) * 100);
      }
    };

  }, [message]);

  // Reset speech synthesis
  const resetSpeechSynthesis = () => {
    synth.current.cancel();
    synth.current = window.speechSynthesis;
  };

  // Toggle Play / Pause
  const toggleSpeech = () => {
    if (!synth.current) return;

    if (synth.current.speaking && !synth.current.paused) {
      synth.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
      pausedTimeRef.current = Date.now() - startTimeRef.current;
      cancelAnimationFrame(animationRef.current);
    } else if (isPaused) {
      synth.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      startTimeRef.current = Date.now() - pausedTimeRef.current;
      animateProgress();
    } else {
      setProgress(0);
      synth.current.cancel();
      utteranceRef.current.text = message.slice(lastCharIndex.current); // Resume from last point
      synth.current.speak(utteranceRef.current);
      setIsPlaying(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
      animateProgress();
    }
  };

  // Animate Progress Bar
  const animateProgress = () => {
    const update = () => {
      if (!synth.current.speaking || isPaused) {
        cancelAnimationFrame(animationRef.current);
        return;
      }
      const elapsed = Date.now() - startTimeRef.current;
      const totalDuration = utteranceRef.current.text.length * 60;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        animationRef.current = requestAnimationFrame(update);
      }
    };
    animationRef.current = requestAnimationFrame(update);
  };

  // Reset progress bar smoothly
  const resetProgress = () => {
    setTimeout(() => {
      setProgress(0);
      lastCharIndex.current = 0;
    }, 500);
  };

  // Download text as a file
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
        <div className="absolute top-0 left-0 h-1 bg-orange-400 rounded-full transition-all duration-200 ease-linear" style={{ width: `${progress}%` }}></div>
        <div className="absolute bottom-[-5px] w-4 h-4 bg-orange-500 rounded-full transition-all duration-200 ease-linear" style={{ left: `${progress}%` }}></div>
      </div>
      <a href={audioURL} download="speech.txt" className="px-2 text-black font-bold justify-center items-center hover:bg-slate-300 py-2 flex ml-5 text-sm cursor-pointer rounded-md" onClick={downloadAudio}>
        <RxDownload className="size-6" /> Download
      </a>
    </div>
  );
};

export default SpeechPlayer;

