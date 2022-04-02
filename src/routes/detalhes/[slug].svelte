<script context="module" lang="ts">
  import type { IDetails } from "src/stores/interface-store";

  export const load = async ({ params, fetch }) => {
    const { slug } = params;
    const res = await fetch(
      `https://www.livelo.com.br/ccstoreui/v1/pages/layout/ganhe-pontos-compre-pontue-${slug}`
    );
    const data: IDetails = await res.json();

    console.log(data);

    const { regions, title } = data;
    const img = regions?.find((e) => e?.widgets[0]?.targetBannerImg)?.widgets[0]
      .targetBannerImg.src;

    return {
      props: {
        title,
        img,
      },
    };
  };
</script>

<script lang="ts">
  export let title: string;
  export let img: string;

  const baseURL = "https://www.livelo.com.br/";
  // export let user;
</script>

<!-- <img src={baseURL + detalhesParceiro.image} alt="">

<p>{JSON.stringify(detalhesParceiro.image)}</p> -->

<h1>{title}</h1>
<img src={baseURL + img} alt="" />
