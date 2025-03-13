import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { FaCirclePlay, FaCirclePause } from "react-icons/fa6";
import { RxDownload } from "react-icons/rx";

const SpeechPlayer = ({ message }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audioURL, setAudioURL] = useState(null);

  const synth = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const pauseTimeRef = useRef(null);
  const estimatedDurationRef = useRef(null);

  const animateProgress = useCallback(() => {
    const update = () => {
      if (isPaused) return; 

      const elapsed = Date.now() - startTimeRef.current;
      const estimatedProgress = (elapsed / estimatedDurationRef.current) * 100;

      setProgress((prev) => Math.max(prev, Math.min(estimatedProgress, 100)));

      if (estimatedProgress < 100 && synth.current.speaking) {
        animationRef.current = requestAnimationFrame(update);
      }
    };

    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(update);
  }, [isPaused]);

  useEffect(() => {
    if (!synth.current) {
      console.error("SpeechSynthesis is not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(message);
    utteranceRef.current = utterance;
    utterance.volume = 1;

    const updateVoices = () => {
      let voices = synth.current.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices.find((voice) => voice.lang.includes("en")) || voices[0];
      } else {
        setTimeout(updateVoices, 100);
      }
    };

    updateVoices();
    synth.current.onvoiceschanged = updateVoices;

    utterance.onstart = () => {
      startTimeRef.current = Date.now();
      estimatedDurationRef.current = message.length * 50;
      setProgress(0);
      setIsPlaying(true);
      setIsPaused(false);
      setTimeout(() => animateProgress(), 50); 
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      cancelAnimationFrame(animationRef.current);
      setTimeout(() => setProgress(0), 800);
    };
  }, [message, animateProgress]);

  const toggleSpeech = () => {
    if (!synth.current) return;

    if (synth.current.speaking && !synth.current.paused) {
      synth.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
      pauseTimeRef.current = Date.now();
      cancelAnimationFrame(animationRef.current);
    } else if (isPaused) {
      synth.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      startTimeRef.current += Date.now() - pauseTimeRef.current;
      animateProgress();
    } else {
      synth.current.cancel();
      setProgress(0);
      setIsPlaying(true);
      setIsPaused(false);
      startTimeRef.current = Date.now();
      synth.current.speak(utteranceRef.current);
      animateProgress();
    }
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
        <div
          className="absolute top-0 left-0 h-1 bg-orange-400 rounded-full transition-all duration-[50ms] ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
        <div
          className="absolute bottom-[-5px] w-4 h-4 bg-orange-500 rounded-full transition-all duration-[50ms] ease-linear"
          style={{ left: `${progress}%`, transform: "translateX(-50%)" }}
        ></div>
      </div>
      <a
        href={audioURL}
        download="speech.txt"
        className="px-2 text-black font-bold justify-center items-center hover:bg-slate-300 py-2 flex ml-5 text-sm cursor-pointer rounded-md"
        onClick={downloadAudio}
      >
        <RxDownload className="size-6" /> Download
      </a>
    </div>
  );
};

SpeechPlayer.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SpeechPlayer;
