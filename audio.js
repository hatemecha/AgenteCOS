import { DEFAULT_LANG, DEFAULT_VOLUME } from './config.js';

let recognition;

export function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return;
  recognition = new SpeechRecognition();
  recognition.lang = DEFAULT_LANG;
}

export function startListening() {
  recognition && recognition.start();
}

export function stopListening() {
  recognition && recognition.stop();
}

export function speakResponse(text) {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      resolve();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = DEFAULT_LANG;
    utterance.volume = DEFAULT_VOLUME;
    utterance.onend = resolve;
    utterance.onerror = reject;
    speechSynthesis.speak(utterance);
  });
}
