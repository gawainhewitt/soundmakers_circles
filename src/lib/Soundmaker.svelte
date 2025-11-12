<script>
  import { onMount } from 'svelte';
  import AudioEngine from './AudioEngine.js';
  
  let audioEngine = new AudioEngine();
  let isInitialized = false;
  let currentFrequency = 440;
  
  onMount(async () => {
    try {
      // Initialize on first user interaction
      document.addEventListener('touchstart', initializeAudio, { once: true });
    } catch (error) {
      console.error('Setup failed:', error);
    }
  });
  
  async function initializeAudio() {
    try {
      await audioEngine.initialize();
      isInitialized = true;
    } catch (error) {
      console.error('Audio initialization failed:', error);
    }
  }
  
  function playSound() {
    if (!isInitialized) {
      alert('Please tap anywhere to initialize audio first');
      return;
    }
    
    try {
      audioEngine.playTone(currentFrequency, 500, 'sine');
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  }
  
  function updateFrequency(event) {
    currentFrequency = parseInt(event.target.value);
  }
</script>

<div class="soundmaker">
  <h2>Soundmaker</h2>
  
  {#if !isInitialized}
    <button on:click={initializeAudio} class="init-button">
      Initialize Audio
    </button>
  {/if}
  
  <div class="controls">
    <label>
      Frequency: {currentFrequency}Hz
      <input 
        type="range" 
        min="200" 
        max="800" 
        bind:value={currentFrequency}
        on:input={updateFrequency}
      />
    </label>
    
    <button on:click={playSound} disabled={!isInitialized}>
      Play Sound
    </button>
  </div>
</div>

<style>
  .soundmaker {
    padding: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 20px;
  }
  
  button {
    padding: 12px 24px;
    background: #007acc;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  button:hover:not(:disabled) {
    background: #005999;
  }
  
  .init-button {
    background: #ff6b6b;
  }
  
  .init-button:hover {
    background: #ff5252;
  }
  
  input[type="range"] {
    width: 100%;
    margin-top: 8px;
  }
  
  label {
    font-weight: bold;
  }
</style>