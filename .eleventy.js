module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/assets/data");
  eleventyConfig.addPassthroughCopy("src/assets/css");


  return{

    dir:{
      input: "src",
      output: "dist",
    },

  };

};