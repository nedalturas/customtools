module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/assets/data");

  return{

    dir:{
      input: "src",
      output: "dist",
    },

  };

};