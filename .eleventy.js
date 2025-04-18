module.exports = function (eleventyConfig) {
  // Supaya folder admin ikut dibuild
  eleventyConfig.addPassthroughCopy("admin");

  // Kumpulkan semua file di src/posts jadi koleksi "posts"
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
