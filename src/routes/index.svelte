<script context="module" lang="ts">
  import type { ICard, IParceirosAPI } from "src/stores/interface-store";

  export const load = async ({ fetch }) => {
    const resProgram = await fetch(`api/parceiros`);
    const { cards, categories }: IParceirosAPI = await resProgram.json();

    return {
      props: {
        cards,
        categories,
      },
    };
  };
</script>

<script lang="ts">
  import Partners from "$lib/Partners.svelte";

  export let cards: ICard[];
  export let categories: string[];
</script>

<Partners {categories} {cards} />

<style lang="scss">
</style>
