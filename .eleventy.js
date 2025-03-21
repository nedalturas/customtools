module.exports = function(eleventyConfig) {
  // Copy these directories as-is to the output folder
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Set custom directories for input, output, includes, and data
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "../_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "md", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};