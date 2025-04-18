// Add this to your .eleventy.js file
eleventyConfig.addGlobalData("heroSlides", async () => {
  const slides = await getCollectionData('heroSlides');
  return slides.sort((a, b) => a.order - b.order);
});

eleventyConfig.addGlobalData("programs", async () => {
  const programs = await getCollectionData('programs');
  return programs.sort((a, b) => a.order - b.order);
});

eleventyConfig.addGlobalData("team", async () => {
  const team = await getCollectionData('team');
  return team.sort((a, b) => a.order - b.order);
});

eleventyConfig.addGlobalData("articles", async () => {
  const articles = await getCollectionData('articles');
  return articles.sort((a, b) => a.order - b.order);
});

eleventyConfig.addGlobalData("timeline", async () => {
  const timeline = await getCollectionData('timeline');
  return timeline.sort((a, b) => a.order - b.order);
});

eleventyConfig.addGlobalData("gallery", async () => {
  const gallery = await getCollectionData('gallery');
  return gallery.sort((a, b) => a.order - b.order);
});
// Tambahkan konfigurasi untuk halaman artikel
eleventyConfig.addGlobalData("articles", async () => {
  const articles = await getCollectionData('articles');
  return articles.sort((a, b) => a.order - b.order);
});

// Tambahkan filter markdown jika belum ada
eleventyConfig.addFilter("markdown", function(content) {
  const md = new markdownIt();
  return md.render(content);
});
