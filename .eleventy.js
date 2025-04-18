const markdownIt = require("markdown-it");
const getCollectionData = require("./utils/getCollectionData");

module.exports = function(eleventyConfig) {

  // Hero Slides
  eleventyConfig.addGlobalData("heroSlides", async () => {
    const slides = await getCollectionData('heroSlides');
    return slides.sort((a, b) => a.order - b.order);
  });

  // Programs
  eleventyConfig.addGlobalData("programs", async () => {
    const programs = await getCollectionData('programs');
    return programs.sort((a, b) => a.order - b.order);
  });

  // Team
  eleventyConfig.addGlobalData("team", async () => {
    const team = await getCollectionData('team');
    return team.sort((a, b) => a.order - b.order);
  });

  // Articles
  eleventyConfig.addGlobalData("articles", async () => {
    const articles = await getCollectionData('articles');
    return articles.sort((a, b) => a.order - b.order);
  });

  // Timeline
  eleventyConfig.addGlobalData("timeline", async () => {
    const timeline = await getCollectionData('timeline');
    return timeline.sort((a, b) => a.order - b.order);
  });

  // Gallery
  eleventyConfig.addGlobalData("gallery", async () => {
    const gallery = await getCollectionData('gallery');
    return gallery.sort((a, b) => a.order - b.order);
  });

  // Markdown filter
  eleventyConfig.addFilter("markdown", function(content) {
    const md = new markdownIt();
    return md.render(content);
  });

};
