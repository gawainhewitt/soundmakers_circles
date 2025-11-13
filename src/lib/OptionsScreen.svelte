<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  
  const dispatch = createEventDispatcher();
  
  function handleSave() {
    dispatch('save');
  }
  
  function handleKeydown(e) {
    // Save on Enter or Escape
    if (e.key === 'Enter' || e.key === 'Escape') {
      dispatch('save');
    }
  }
  
  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });
  
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="options-screen">
  <div class="content">
    <h1>Options</h1>
    <p class="placeholder-text">Options and settings will be configured here.</p>
    <p class="placeholder-subtext">Future features: volume control, key mappings, scale selection, and more!</p>
    
    <button class="save-button" on:click={handleSave}>
      Save
    </button>
  </div>
</div>

<style>
  .options-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    box-sizing: border-box;
    z-index: 9999;
  }
  
  .content {
    max-width: 600px;
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #333;
  }
  
  .placeholder-text {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #555;
    line-height: 1.6;
  }
  
  .placeholder-subtext {
    font-size: 1rem;
    margin-bottom: 3rem;
    color: #777;
    font-style: italic;
  }
  
  .save-button {
    background-color: #FBAC2E;
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(251, 172, 46, 0.3);
  }
  
  .save-button:hover {
    background-color: #E99A1A;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(251, 172, 46, 0.4);
  }
  
  .save-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(251, 172, 46, 0.3);
  }
  
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .placeholder-text {
      font-size: 1rem;
    }
    
    .placeholder-subtext {
      font-size: 0.9rem;
    }
    
    .save-button {
      padding: 0.8rem 2rem;
      font-size: 1rem;
    }
  }
  
  @media (orientation: landscape) and (max-height: 500px) {
    .options-screen {
      padding: 1rem;
    }
    
    h1 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    
    .placeholder-text {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .placeholder-subtext {
      font-size: 0.8rem;
      margin-bottom: 1.5rem;
    }
    
    .save-button {
      padding: 0.6rem 1.5rem;
      font-size: 0.9rem;
    }
  }
</style>
