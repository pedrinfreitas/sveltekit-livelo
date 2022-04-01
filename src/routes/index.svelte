<script context="module" lang="ts">
  import type {
    ICard,
    IParceiro,
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
        parceiros,
        cards,
        categories,
      },
    };
  };
</script>

<script lang="ts">
  import Partners from "$lib/Partners.svelte";

  //export let categorias;
  export let parceiros: IResumoParceiros[];
  export let cards: ICard[];
  export let categories: string[];

  let busca = "";
  const baseURL = "https://www.livelo.com.br/";

  //pegar os parceiros com beneficio ativo
  parceiros = parceiros.sort((a, b) => b.parity - a.parity);

  $: parceirosAchados = parceiros.filter((e) =>
    e?.url?.toLowerCase().includes(busca.toLowerCase())
  );

  $: itens = parceirosAchados || parceiros;
</script>

<Partners {categories} {cards} />

<h1>Parceiros Livelo</h1>
<input type="text" placeholder="Busca" bind:value={busca} />

<div class="card__box">
  {#if parceirosAchados.length}
    {#each itens as item}
      <div class="card__item">
        <h2 class="item__title">
          {item.url.slice(0, item.url.indexOf("/", 8))}
        </h2>

        <div class="item__pontos">
          <div class="pontos__pts">{item.currency}</div>
          <div class="pontos__value">{item.value}</div>
          <div class="pontos__separador">{item.separator}</div>
          <div class="pontos__value">{item.parityClub}</div>
          <div class="pontos__pts">Pontos</div>
        </div>

        <!-- <button class="item__botao"> detalhes </button> -->
        <a
          class="item__botao"
          sveltekit:prefetch
          href={`/detalhes/${item.partnerCode}`}
        >
          detalhes
        </a>
      </div>
    {/each}
  {:else}
    <p>Nada encontrado com o texto {busca}</p>
  {/if}
</div>

<style lang="scss">
  input {
    border: solid 1px #ddd;
    height: 2rem;
    padding: 0.25rem 0.5rem;
    box-shadow: 0 0 20px #eee;
    width: 33%;
  }

  .card__box {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    margin: 1rem 0;

    .card__item {
      border: 1px solid #ddd;
      box-shadow: 0 0 20px #eee;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .item__title {
        font-size: 1rem;
      }
      .item__pontos {
        display: flex;
        align-items: center;
        font-size: 2rem;
        .pontos__pts {
          font-size: 1rem;
          padding: 0 0.25rem;
        }
        .pontos__value {
          font-size: 2rem;
        }
        .pontos__separador {
          padding: 1rem;
        }
      }
      .item__botao {
        border: solid 1px #ddd;
        height: 2rem;
        width: 33%;
        padding: 0.25rem 0.5rem;
        box-shadow: 0 0 20px #eee;
        background-color: #eee;
        border-radius: 4px;
      }
    }
  }
</style>
