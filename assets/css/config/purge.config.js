module.exports = {
  enabled: process.env.HUGO_ENV === 'production',
  content: [
    './hugo_stats.json',
    './func/*.html',
    './layouts/**/*.html',
  ],
  extractors: [
    {
      extractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        return els.tags.concat(els.classes, els.ids);
      },
      extensions: ['json']
    },
  ],
  options: {
    safelist: [],
  }
}