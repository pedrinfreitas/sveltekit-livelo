export interface IRespostaAPI {
  categories: string[];
  partners: IParceiro[];
}

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

export interface IRegrasParceiro {
  id: number;
  partnersConfigId: string;
  siteId: string;
  title: string;
  text: string;
  displayOrder: number;
}

export interface IResumoParceiros {
  partnerCode: string;
  parity: number;
  parityClub: number;
  currency: string;
  value: number;
  startDate?: string;
  endDate?: string;
  legalTerms?: string;
  url: string;
  separator: string;
}

export interface ICard {
  id: string;
  image: string;
  categories: string;
  name: string;
  currency: string;
  value: number;
  separator: string;
  parityClub: number;
  url: string;
}

export interface IDetails {
  regions: IWidgets[];
  title: string;
}

interface IWidgets {
  widgets: {
    targetBannerImg: {
      src: string;
    };
  };
}
