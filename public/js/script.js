const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const socket = io();
recognition.lang = 'en-US';

window.setInterval(function () { recognition.start() }, 7000)
recognition.addEventListener('result', (e) => {
    let last = e.results.length - 1;
    let text = e.results[last][0].transcript;

    console.log('confidence: ' + e.results[0][0].confidence);
    console.log(text);
    outgoing_message(text)
    // sendToBot(text);
})

recognition.addEventListener('speechend', () => {
    recognition.stop();
})

function synthVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

socket.on('bot reply', function (replyText) {
    send_bot_message(replyText);
    synthVoice(replyText);
})

recognition.addEventListener('error', (e) => {
    console.log(e)
});

socket.on('bot text', function (replyText) {
    send_bot_message(replyText);
});

socket.on('bot image', function (replyText) {
    send_bot_img(replyText);
});

function sendToBot(text){
    socket.emit('chat message', text);
}

socket.on('item check', function(item_index){
    check_item(item_index);
});

socket.on('bot url', function(url){
    send_bot_message(`<a href="${url}">Pharamacy Google Map!</a>
    `)
});