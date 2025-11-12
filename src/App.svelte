
<script>
  import Soundmaker from './lib/Soundmaker.svelte';
  import ResponsiveContainer from './lib/ResponsiveContainer.svelte';
  import OrientationTest from './lib/OrientationTest.svelte';

</script>

<main>
  <ResponsiveContainer>
    <h1>Audio Soundmakers</h1>
    <OrientationTest />
    <Soundmaker />
  </ResponsiveContainer>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em; /* Much smaller for mobile */
    font-weight: 100;
    margin: 0.5em 0;
  }

  @media (min-width: 640px) {
    h1 {
      font-size: 4em; /* Keep it big on desktop */
    }
  }

  @media (orientation: landscape) and (max-height: 500px) {
    h1 {
      font-size: 1.5em;
      margin: 0.25em 0;
    }
    
    main {
      padding: 0.5em;
    }
  }
</style>


