module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  pages: {
    '/404': ['error'],
    '/blackjack': ['blackjack']
  },
  loadLocaleFrom: async (locale, namespace) => {
    const m = await import(`./src/translations/${locale}/${namespace}`);

    return m.default;
  }
};
