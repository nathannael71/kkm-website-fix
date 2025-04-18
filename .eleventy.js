const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Tambahkan filter 'date'
  eleventyConfig.addFilter("date", (dateObj, format = "dd LLLL yyyy") => {
    return DateTime.fromJSDate(new Date(dateObj)).toFormat(format);
  });

  // Salin folder 'images' dan 'admin'
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    passthroughFileCopy: true
  };
};
