module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");

  return{

    dir:{
      input: "src",
      output: "dist",
    },

  };

};