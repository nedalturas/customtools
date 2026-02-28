module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/assets/data");

  return{

    dir:{
      input: "src",
      output: "dist",
    },

  };

};