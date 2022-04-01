<script context="module" lang="ts">
  export interface IParceiro {
    id: string;
    name: string;
    site: string;
    link: string;
    image: string;
    imageBanner: string;
    enableRecaptcha: boolean;
    enableBenefits: boolean;
    enableModal: boolean;
    createdDate: string;
    partnerType: string;
    categories: string;
    partnersPolicies: IRegrasParceiro[];
    imageMosaic?: string;
    partnerDetailsPage?: string;
    partnerAppDetailsPage?: string;
  }

  interface IRegrasParceiro {
    id: number;
    partnersConfigId: string;
    siteId: string;
    title: string;
    text: string;
    displayOrder: number;
  }

  export const load = async ({ params, fetch }) => {
    console.log(params);
    const { slug } = params;
    const res = await fetch(
      `https://www.livelo.com.br/ccstore/v1/files/thirdparty/config_partners_compre_e_pontue.json`
    );
    const data = await res.json();

    const { partners } = data;
    const detalhesParceiro: IParceiro = partners.filter(
      (e) => e.id === slug && e.enableBenefits
    )[0];

    return {
      props: {
        detalhesParceiro,
      },
    };
  };
</script>

<script lang="ts">
  export let detalhesParceiro: IParceiro;

  const baseURL = "https://www.livelo.com.br/";
  // export let user;
</script>
<img src={baseURL + detalhesParceiro.image} alt="">

<p>{JSON.stringify(detalhesParceiro.image)}</p>
<p>{JSON.stringify(detalhesParceiro)}</p>

<!-- <h1>{post.title}</h1>
<p>{post.body}</p>
<p>Written by <a href={`/authors/${user.id}`}>{user.name}</a></p> -->
