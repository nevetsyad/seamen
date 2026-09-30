// Audio effect controller for Seamen
// Uses Web Audio API to generate simple sound effects

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.enabled = true;
    this.init();
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.warn('Web Audio API not supported:', e);
      this.audioContext = null;
    }
  }

  async ensureContext() {
    if (!this.audioContext) return false;
    if (this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (e) {
        return false;
      }
    }
    return this.audioContext.state === 'running';
  }

  playTone(frequency, duration, type = 'sine', volume = 0.2) {
    if (!this.enabled || !this.audioContext) return;

    this.ensureContext().then(ok => {
      if (!ok) return;

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = type;

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + duration / 1000);
    });
  }

  playDescend() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(300, 400, 'sine', 0.15);
    setTimeout(() => this.playTone(200, 400, 'sine', 0.1), 100);
    setTimeout(() => this.playTone(100, 400, 'sine', 0.08), 200);
  }

  playBubble() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(800, 150, 'sine', 0.1);
    setTimeout(() => this.playTone(1000, 150, 'sine', 0.08), 80);
  }

  playTick() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(600, 50, 'square', 0.1);
  }

  playTimeout() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(150, 600, 'sawtooth', 0.2);
    setTimeout(() => this.playTone(100, 600, 'sawtooth', 0.15), 300);
  }

  playSurface() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(400, 200, 'sine', 0.12);
    setTimeout(() => this.playTone(600, 200, 'sine', 0.1), 100);
    setTimeout(() => this.playTone(800, 400, 'sine', 0.15), 200);
  }

  playWhoosh() {
    if (!this.enabled || !this.audioContext) return;
    this.playTone(500, 50, 'sine', 0.1);
    setTimeout(() => this.playTone(200, 300, 'sine', 0.12), 30);
  }
}

// Singleton instance
const audioManager = new AudioManager();

// Named export for the simple playSound interface
export function playSound(soundName, enabled = true) {
  audioManager.enabled = enabled;

  switch (soundName) {
    case 'descend':
      audioManager.playDescend();
      break;
    case 'bubble':
      audioManager.playBubble();
      break;
    case 'tick':
      audioManager.playTick();
      break;
    case 'timeout':
      audioManager.playTimeout();
      break;
    case 'surface':
      audioManager.playSurface();
      break;
    case 'whoosh':
      audioManager.playWhoosh();
      break;
    default:
      break;
  }
}

export default audioManager;
