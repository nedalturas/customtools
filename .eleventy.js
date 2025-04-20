const { DateTime } = require("luxon")
module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");

  // Import prior to `module.exports` within `.eleventy.js`
  eleventyConfig.addFilter("formatInZone", function(date, zone, format = "ff"){

    return DateTime.fromISO(date).setZone(zone).toFormat(format);

  });


  return{

    dir:{
      input: "src",
      output: "dist",
    },

  };

};