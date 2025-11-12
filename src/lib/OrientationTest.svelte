<script>
  import { getContext } from 'svelte';
  const orientation = getContext('orientation');
</script>

<p>Current orientation: {$orientation}</p>