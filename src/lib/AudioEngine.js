class AudioEngine {
  constructor() {
    this.audioContext = null;
    this.isInitialized = false;
  }

  async initialize() {
    try {
      // Handle different browser prefixes
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      
      if (!AudioContext) {
        throw new Error('Web Audio API not supported');
      }

      this.audioContext = new AudioContext();
      
      // Resume context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
        // iOS audio unlock - play silent sound
        const buffer = this.audioContext.createBuffer(1, 1, 22050);
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        source.start(0);
      }
      
      this.isInitialized = true;
      console.log('Audio engine initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
      throw error;
    }
  }

  createOscillator(frequency = 440, type = 'sine') {
    if (!this.isInitialized) {
      throw new Error('Audio engine not initialized');
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    return { oscillator, gainNode };
  }

  playTone(frequency = 440, duration = 1000, type = 'sine') {
    const { oscillator, gainNode } = this.createOscillator(frequency, type);
    
    // Fade in
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
    
    // Fade out
    gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + duration/1000 - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration/1000);
    
    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration/1000);
  }
}

export default AudioEngine;