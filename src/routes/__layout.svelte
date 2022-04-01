<script>
  //import Menu from '$lib/menu.svelte';
</script>

<div class="page__container">
  <slot />
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500&display=swap");

  :root {
    font-family: "Roboto", sans-serif;
  }

  :global(html) {
    box-sizing: border-box;
    font-size: 16px;
  }

  :global(body, h1, h2, h3, h4, h5, h6, p, ol, ul) {
    margin: 0;
    padding: 0;
  }

  :global(ol, ul) {
    list-style: none;
  }

  :global(img) {
    max-width: 100%;
    height: auto;
  }

  .page__container {
    max-width: 800px;
    margin: 50px auto;
  }
</style>
