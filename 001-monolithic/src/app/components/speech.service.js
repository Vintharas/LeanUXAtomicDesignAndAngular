export class SpeechService{
    constructor(){
    'ngInject';
    }

    say(sentence){
        if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) return;
        
        var s = new SpeechSynthesisUtterance(sentence);
        s.lang = 'en-US';
        speechSynthesis.speak(s);
    }

}
