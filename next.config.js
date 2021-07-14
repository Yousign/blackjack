const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blackjack',
        permanent: true
      }
    ];
  }
});
