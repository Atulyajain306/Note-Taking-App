import { useState, useRef, useEffect } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FaCirclePause } from "react-icons/fa6";
import { RxDownload } from "react-icons/rx";
const SpeechPlayer = ( message ) => {
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

    utteranceRef.current = new SpeechSynthesisUtterance(message);
    let voices = synth.current.getVoices();
    if (voices.length > 0) {
      utteranceRef.current.voice = voices[3] || voices[0]; 
    }

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      cancelAnimationFrame(animationRef.current);
    };

    utteranceRef.current.onboundary = (event) => {
      let totalDuration = utteranceRef.current.text.length ;
      setProgress((event.charIndex / totalDuration) * 100);
    };

    const handleVoicesChanged = () => {
        let updatedVoices = synth.current.getVoices();
        if (updatedVoices.length > 0) {
          utteranceRef.current.voice = updatedVoices[3] || updatedVoices[0];
        }
      };
  
      synth.current.onvoiceschanged = handleVoicesChanged;
  }, [message]);

  const toggleSpeech = () => {
    if (synth.current.speaking && !synth.current.paused) {
      synth.current.pause();
      setIsPaused(true);
      setIsPlaying(false);
    } else if (isPaused) {
      synth.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
      animateProgress();
    } else {
      synth.current.speak(utteranceRef.current);
      setIsPlaying(true);
      setIsPaused(false);
      animateProgress();
    }
  };
  

  const animateProgress = () => {
    if (!synth.current.speaking) return;
    setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    animationRef.current = requestAnimationFrame(animateProgress);
  };

  const downloadAudio = () => {
    const blob = new Blob([message], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    setAudioURL(url);
  };

  return (
    <div className="px-1 py-1 mt-3 flex border border-black rounded-xl items-center">
      <div className="flex gap-4 m-1">
 <button className="px-4 py-2  rounded-md" onClick={toggleSpeech} >
 {isPlaying ? <FaCirclePause  className="size-6" /> : <FaCirclePlay  className="size-6" />}
        </button>
      </div>
      <div className="relative w-[65vw] h-1 bg-gray-300 rounded-full mt-2">
   <div className="absolute top-0 left-0 h-1 bg-orange-400 rounded-full" style={{ width: `${progress}%` }} ></div>
 <div className="absolute bottom-[-5px] w-4 h-4 bg-orange-500 rounded-full transition-none" style={{ left: `${progress}%` }}></div>
      </div>
      <a  href={audioURL} download="speech.mp3" className=" px-2 text-black font-bold justify-center items-center hover:bg-slate-400 py-2 flex ml-5 text-sm cursor-pointer  rounded-md" onClick={downloadAudio}>
      <RxDownload className="size-6" /> Download 
        </a>
    </div>
  );
};

export default SpeechPlayer;
