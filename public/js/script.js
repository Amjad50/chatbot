const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const socket = io();
    window.setInterval(function(){recognition.start()},7000)
recognition.addEventListener('result', (e) =>{
    let last = e.results.length -1 ;
    let text = e.results[last][0].transcript;

    console.log('confidence: '+ e.results[0][0].confidence);
    console.log(text);
    socket.emit('chat message', text);
})

recognition.addEventListener('speechend', () => {
    recognition.stop();
})

function synthVoice(text){
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

socket.on('bot reply', function(replyText){
    synthVoice(replyText);
})

recognition.addEventListener('error', (e) => {
    console.log(e)
  });