import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

// Prevent pinch zoom
document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
  document.body.style.zoom = 0.99;
});

document.addEventListener('gesturechange', function(e) {
  e.preventDefault();
  document.body.style.zoom = 0.99;
});

document.addEventListener('gestureend', function(e) {
  e.preventDefault();
  document.body.style.zoom = 1;
});

// Prevent double-tap zoom
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Force reset zoom on page load
window.addEventListener('load', function() {
  // Reset any accidental zoom
  document.body.style.zoom = 1;
  
  // Also try the viewport meta approach
  const viewport = document.querySelector('meta[name=viewport]');
  if (viewport) {
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=0, viewport-fit=cover';
  }
});

export default app
