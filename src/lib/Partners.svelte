<script lang="ts">
  import type { ICard } from "src/stores/interface-store";
  import { data } from "../stores";
  import { paginate, LightPaginationNav } from "svelte-paginate";

  export let cards: ICard[];
  export let categories: string[];

  const baseURL = "https://www.livelo.com.br/";

  let search = "";
  let value = "";

  $: searched = cards.filter(
    (e) =>
      e?.name?.toLowerCase().includes(search.toLowerCase()) &&
      e?.categories?.toLowerCase().includes(value.toLowerCase())
  );

  $: items = searched || cards;

  let currentPage = 1;
  let pageSize = 10;
  $: paginatedItems = paginate({ items, pageSize, currentPage });

</script>

<div class="partners__content">
  <div class="content__title">
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAADYklEQVRIieWWS2hcZRiGn/9ckrlkJmPbTGNualtSGxsjxGotLhoUjZcKBRXUgBvtwk1bFwYvoEKDNYiLoghuBFtoUVCIliIlqdF4KVGEXJ20msk4nelkmmaSzGRmzmV+F4nTTCbG2LjzhbN5vu9/3+8/nPOfI1hUjdf7hi7UdndJCetRyjAwpX00PDv7JoBY5PrWGzZMDRw45HHp+roC0pZJwwfvJoIzCT9gKgAbHY5nntzRWLYm81wOTBMyBqQzMJ9evDKQyeK0JPu3bNecqvpEfgf1GzZd6m57rqrGW76yqW2DYYFlLQT8gy4l59j1yUej0VSyQQGamzZX+lc0t+2F6ZLzYBhrMgeoLvPQtHFzBXCX2ljh/+xIy4N1tV7fkha5eAuyazZdri3lPtdXE7/XaKZpNd7j9PLd8BAH+7oXzHMSpLwu46Wqc7mbNYdQFCKT7EGnf0/ruk0L5HRMKvYKk141spyNR4r4yFyC0bmZIt4djzJtGkX8RDDgU4ycbeaWhXRfidI5Plq04ONIkOOR8SJ+dHyUnni0gOWk5MjILx5FCHHqrYtDBdN3TowRczk5HQvneSA5wxeJOF0zccaSs3l+OhbmsstBZyhQsIuOC4NoQjklAP2x+1t/iwwO1tY6XQQy87S9c4z6Xbs59tR+RCyGW9WIqoIXjn+KlJL32x6nWgpStoWsrOTgyc8Z/aGPk+2HqXe4CKVTVN/eFOo6e2abAPh51uyYTGVembocxV9Th6pp+UkS8UmMbAZ/TV2eSSmJ/TGBw+nCV+HPc9uymAyH2FRZRUVZaUezR39NANxx9+5zJ7r79ubW/2QCoAh4uuXe3oH+H/dqAOFg8BZlsbBcgz/18/WZL7FMs4Bruk7Lw/vY2Xxn0RopJZFQ8GYArai6RBdGhulsP8yLL7+KvuwYNw2Dt186xOvvfci2HQ1/67FqwPneHp59/gD3tT4EwMXArwgh2Fq/HYCpK3HO9/Zcf4BlmWjatSP8+2+/KQjQNB1zhRdsqZRVq/+B/ucBZR4P7jLPqj0agKqq4bHhoZvqb9v5rwIeeORRpu3iT0dgcABN1UJw7a/iVv+NVV0lpaU+ZJ4xNzvjdLtdJR5vuQ0wfXVaFYrA5/PZf/Wk0ukkS48Agcxms4l4NLIPCPwJ/wBd1a9l7ocAAAAASUVORK5CYII="
      height="24"
      width="24"
      alt="icone de uma loja"
      aria-hidden="true"
    />
    <h2>A melhores lojas estão aqui {$data.categories}</h2>
  </div>

  <p class="content__description">
    Alguns de nossos parceiros tem o cálculo do ponto baseado no dólar de
    turismo.
  </p>

  <div class="content__action">
    <select bind:value class="actions__inputs" name="select">
      <option value="" disabled selected>Categoria</option>
      {#if categories?.length}
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      {:else}
        <option value="" disabled selected>Categoria</option>
      {/if}
    </select>

    <input
      class="actions__inputs"
      type="text"
      placeholder="Buscar"
      bind:value={search}
    />
  </div>

  <div class="content__cards">
    {#if items?.length}
      {#each paginatedItems as item}
        <div class="content__card">
          <div class="card__img">
            <img
              src={baseURL + item.image}
              alt="logo da empresa"
              width="128"
              height="128"
            />
          </div>

          <div class="item__pontos">
            <div class="pontos__pts">{item.currency}</div>
            <div class="pontos__value">{item.value}</div>
            <div class="pontos__separador">{item.separator}</div>
            <div class="pontos__value">{item.parityClub}</div>
            <div class="pontos__pts pontos__pts--small">Pontos</div>
          </div>

          <a
            sveltekit:prefetch
            href={item.url}
            target="_blank"
            class="card__button card__button--primary"
          >
            ir para o site</a
          >
          <a
              
            href={`/detalhes/${item.name?.toLowerCase()}`}
            class="card__button card__button--secondary"
          >
            saiba mais</a
          >
        </div>
      {/each}
    {:else}
      <img
        src="data:image/png;base64,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"
        alt="logo da empresa"
        width="64"
        height="64"
      />
      <p>Nada encontrado com o texto {search}</p>
    {/if}
  </div>
  <div class="content__paginate">
    <LightPaginationNav
      totalItems={items?.length}
      {pageSize}
      {currentPage}
      limit={1}
      showStepOptions={true}
      on:setPage={(e) => (currentPage = e.detail.page)}
    />
  </div>
</div>

<style lang="scss">
  .partners__content {
    padding: 1rem;
    display: flex;
    flex-direction: column;

    .content__title {
      display: flex;
      align-items: center;
      font-size: 0.75rem;

      width: 100%;
      img {
        padding: 0.5rem;
      }
      h2 {
        padding: 0.5rem;
      }
    }
    .content__description {
      padding: 0.5rem;
      font-size: 0.75rem;
    }

    .content__action {
      display: flex;
      height: 2rem;

      padding: 0.5rem;

      .actions__inputs {
        color: #665;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        background-color: #fff;
      }
      select {
        margin-right: 1rem;
        width: 35%;
      }
      select:required:invalid {
        color: gray;
      }
      option[value=""][disabled] {
        display: none;
      }

      input {
        width: 65%;
      }
    }

    .content__cards {
      display: grid;
      //grid-template-columns: 1fr 1fr;

      .content__card {
        //height: 10rem;
        //width: 100%;
        border: 1px solid #e7e7e7;
        border-radius: 4px;
        margin: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;

        .card__img {
          display: flex;
          align-items: center;
          height: 128px;
          width: 128px;
          aspect-ratio: 1;
        }

        .item__pontos {
          display: flex;
          align-items: center;
          font-size: 1rem;
          padding: 0.5rem;

          .pontos__pts {
            font-size: 0.85rem;
            padding: 0 0.25rem;
            &--small {
              font-size: 0.65rem;
            }
          }
          .pontos__value {
            font-size: 1rem;
          }
          .pontos__separador {
            padding: 0 0.25rem;
          }
        }

        .card__button {
          border: 1px solid #2f237d;
          border-radius: 1rem;
          width: calc(100% - 1rem);
          margin-bottom: 0.5rem;
          height: 2rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;

          &--primary {
            background-color: #2f237d;
            color: #fff;
          }

          &--secondary {
            background-color: transparent;
            color: #2f237d;
          }
        }
      }
    }

    .content__paginate {
      margin: 0.5rem;
      display: initial;
    }
    :global(.option.number),
    :global(.option.ellipsis),
    :global(.option.prev),
    :global(.option.next) {
      padding: 0.5rem 0.5rem;
    }
  }

  @media screen and (min-width: 320) {
    .content__cards {
      grid-template-columns: 1fr;
    }
  }

  @media screen and (min-width: 375px) {
    .content__cards {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (min-width: 480px) {
    .content__cards {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media screen and (min-width: 640px) {
    .content__cards {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media screen and (min-width: 768px) {
    .content__cards {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media screen and (min-width: 1024px) {
    .content__cards {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media screen and (min-width: 1200px) {
    .content__cards {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
</style>
