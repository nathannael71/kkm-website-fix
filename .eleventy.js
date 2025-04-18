module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("admin"); // Penting! biar Netlify CMS jalan
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
