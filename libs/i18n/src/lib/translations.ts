export const resources = {
  fr: {
    common: {
      welcome: 'Bienvenue sur reserver.ma',
      searchCta: 'Rechercher un séjour'
    }
  },
  en: {
    common: {
      welcome: 'Welcome to reserver.ma',
      searchCta: 'Search your stay'
    }
  },
  es: {
    common: {
      welcome: 'Bienvenido a reserver.ma',
      searchCta: 'Busca tu estancia'
    }
  },
  ar: {
    common: {
      welcome: 'مرحبًا بكم في reserver.ma',
      searchCta: 'ابحث عن إقامتك'
    }
  }
};

export type SupportedLocale = keyof typeof resources;
