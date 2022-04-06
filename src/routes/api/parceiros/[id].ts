import type { IDetails } from "src/stores/interface-store";

export async function get({ params }) {
  const { id } = params;
  const res = await fetch(
    `https://www.livelo.com.br/ccstoreui/v1/pages/layout/ganhe-pontos-compre-pontue-${id}`
  );
  const data: IDetails = await res.json();

  const { regions, title } = data;
  const img = regions?.find((e) => e?.widgets[0]?.targetBannerImg)?.widgets[0]
    .targetBannerImg.src;

  return {
    status: 200,
    body: {
      title,
      img: "https://www.livelo.com.br" + img,
    },
  };
}
