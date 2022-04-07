import type {
  ICard,
  IRespostaAPI,
  IResumoParceiros,
} from "src/stores/interface-store";
import { getColor } from "../../../utils/color-thief";

async function colorThief(img: string, quality: number) {
  return await getColor(img, quality)
    .then((color) => {
      return color;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function get() {
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

  const cards = partnersEnables
    .map(async (e) => {
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
        cores: await colorThief("https://www.livelo.com.br/" + e.image, 15),
      };
    })
    .sort((a: any, b: any) => b.parityClub - a.parityClub);

  return {
    status: 200,
    body: {
      categories,
      cards: await Promise.all(cards),
    },
  };
}
