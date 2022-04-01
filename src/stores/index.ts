import { writable } from "svelte/store";
import type { IRespostaAPI } from "./interface-store";

const responseAPI: IRespostaAPI = { categories: [], partners: [] };

// export const load = async () => {
//   const data = await fetch(
//     `https://www.livelo.com.br/ccstore/v1/files/thirdparty/config_partners_compre_e_pontue.json`,
//     { mode: "no-cors" }
//   )
//     .then((e) => e.json())
//     .then((data) => {
//       console.log(data[0]);
//       return data;
//     })
//     .catch((err) => {
//       console.log(err);
//       return {};
//     });

//   const { categories: categorias, partners: parceiros } = data;

//   return { categorias, parceiros };
// };

//const data = await res.json();

// const { partners } = data;
// const detalhesParceiro: IParceiro = partners.filter(
//   (e) => e.id === slug && e.enableBenefits
// )[0];

// return {
//   props: {
//     detalhesParceiro,
//   },
// };

export const data = writable(responseAPI);

// data.subscribe((e) => e);
