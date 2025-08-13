import { sendToAPI } from './api.js';
import { speakResponse, initSpeechRecognition } from './audio.js';
import { TEXT_INACTIVITY_TIMEOUT_MS } from './config.js';

export function initUI() {
  const sendButton = document.getElementById('sendButton');
  const messageInput = document.getElementById('messageInput');
  const chatLog = document.getElementById('chatLog');
  const statusDot = document.querySelector('.status-dot');
  const mainStatus = document.getElementById('mainStatus');
  const subStatus = document.getElementById('subStatus');

  initSpeechRecognition();

  function updateStatus(text, state) {
    mainStatus.textContent = text;
    subStatus.textContent = '';
    statusDot.style.background = state === 'ready' ? '#10b981'
      : state === 'error' ? '#ef4444'
      : '#fbbf24';
  }

  function showResponse(question, answer) {
    const q = document.createElement('div');
    q.textContent = question;
    const a = document.createElement('div');
    a.textContent = answer;
    chatLog.appendChild(q);
    chatLog.appendChild(a);
  }

  async function sendTextMessage() {
    const msg = messageInput.value.trim();
    if (!msg) return;
    updateStatus('Procesando', 'processing');
    try {
      const res = await sendToAPI(msg);
      showResponse(msg, res);
      await speakResponse(res);
      updateStatus('Sistema listo', 'ready');
    } catch (err) {
      console.error(err);
      updateStatus('Sin conexión', 'error');
    }
    messageInput.value = '';
  }

  sendButton.addEventListener('click', sendTextMessage);
  messageInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendTextMessage();
    }
  });
}
