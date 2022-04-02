<script context="module" lang="ts">
  import type {
    ICard,
    IRespostaAPI,
    IResumoParceiros,
  } from "src/stores/interface-store";

  export const load = async ({ fetch }) => {
    const resProgram = await fetch(
      `https://www.livelo.com.br/ccstore/v1/files/thirdparty/config_partners_compre_e_pontue.json`
    );
    const { partners, categories }: IRespostaAPI = await resProgram.json();

    const partnersEnables = partners.filter((e) => e.enableBenefits);
    const ids = partnersEnables.map((e) => e.id);

    const resDetails = await fetch(
      `https://apis.pontoslivelo.com.br/partners-campaign/v1/campaigns/active?partnersCodes=${ids}`
    );

    const parceiros: IResumoParceiros[] = await resDetails.json();

    const cards: ICard[] = partnersEnables
      .map((e) => {
        const details = parceiros.find((id) => id.partnerCode === e.id);
        return {
          id: e.id,
          image: e.image,
          categories: e.categories,
          name: e.name,
          currency: details.currency,
          value: details.value,
          separator: details.separator,
          parityClub: details.parityClub,
          url: details.url,
        };
      })
      .sort((a, b) => b.parityClub - a.parityClub);

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
