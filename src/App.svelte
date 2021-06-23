<script>
    import { onMount } from 'svelte';
    import { createScene } from './scene.js';

    let el;
    onMount(() => {
        createScene(el);
    });
</script>

<main>
    <canvas bind:this={el}></canvas>
</main>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
    }

    main {
        width: 100%;
        height: 100vh;
    }

    canvas {
        /* position: fixed; */
        width: 100%;
        height: 100vh;
    }
</style>
