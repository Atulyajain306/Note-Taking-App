import { useRef,useState,useEffect } from "react";

const Handlespeechtotext = (options) => {
    const [Load, setLoad] = useState(false)
     const [Listening, setListening] = useState(false);
     const [transcript, settranscript] = useState("");
     const Recognitionref=useRef(null);


useEffect(() => {
     if(!('webkitSpeechRecognition' in window)){
        console.error("Your browser does not support speech recognition");
        return;
     }
     Recognitionref.current=new window.webkitSpeechRecognition();
     const recognition=Recognitionref.current;
     recognition.interimResults=options.interimResults || true
     recognition.lang=options.lang || "en-US"
     recognition.continuous=options.continuous || false

     if("webkitSpeechGrammarList" in window){
     const grammer="#JSGF V1.0; grammer punctuation; public <punc>= . | , | ? | ! | ; | : ;"
     const speechRecognitionList=new window.webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammer,1);
      recognition.grammars = speechRecognitionList
     }

     recognition.onresult=(event)=>{
        let text="";
        for(let i=0;i<event.results.length;i++){
             text += event.results[i][0].transcript
        }
        settranscript(text);
     }

     recognition.onerror=(event)=>{
           console.error("Speech Recognition error",event.error);
     }

     recognition.onend=()=>{
         setListening(false);
         settranscript("");
     }

     return ()=>{
        recognition.stop();
     }

}, [options.continuous,options.interimResults,options.lang])

const startListening=()=>{
    if(Recognitionref.current && !Listening){
        Recognitionref.current.start();
        setListening(true);
        setLoad(true);
    }
}
const stopListening=()=>{
    if(Recognitionref.current && Listening){
        Recognitionref.current.stop();
        setListening(false);
        setLoad(false);
    }
}
   return {Listening,transcript,startListening,stopListening,Load,setLoad}

}
export default Handlespeechtotext