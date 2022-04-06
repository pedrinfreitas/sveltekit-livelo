<script context="module" lang="ts">
  import type { IDetails, IDetailsAPI } from "src/stores/interface-store";

  export const load = async ({ params, fetch }) => {
    const { slug } = params;
    const res = await fetch(`api/parceiros/${slug}`);
    const data: IDetailsAPI = await res.json();
    const { img, title } = data;

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

  // export let user;
</script>

<!-- <img src={baseURL + detalhesParceiro.image} alt="">

<p>{JSON.stringify(detalhesParceiro.image)}</p> -->

<h1>{title}</h1>
<img src={img} alt="" />
