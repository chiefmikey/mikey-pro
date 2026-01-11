<script>
  import { onMount } from 'svelte';

  export let name = 'World';
  export let age = 25;

  let count = 0;
  let mounted = false;

  onMount(() => {
    mounted = true;
    console.log('Component mounted');
  });

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <p>You are {age} years old</p>
  <p>Count: {count}</p>
  <p>Mounted: {mounted}</p>

  <div class="buttons">
    <button on:click={increment}>+</button>
    <button on:click={decrement}>-</button>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background: #d32f00;
  }
</style>
