module.exports = function(eleventyConfig) {
  // Salin file yang tidak perlu diproses Eleventy
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("_data");

  // Tambahkan jika Anda memiliki file JS atau CSS yang tidak diprocess
  // eleventyConfig.addPassthroughCopy("css");
  // eleventyConfig.addPassthroughCopy("js");

  return {
    passthroughFileCopy: true,
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
