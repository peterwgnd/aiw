const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const dateToISO = require("./src/utils/filters/dateToISO.js");
const absoluteUrl = require("./src/utils/filters/absoluteUrl.js");
const htmlToAbsoluteUrls = require("./src/utils/filters/htmlToAbsoluteUrls.js");
const sass = require('./sass.js');
const minifyJs = require('./minifyJs.js');
const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true
});;

module.exports = function(config) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  config.addFilter("squash", require("./src/utils/filters/squash.js") );
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );
  config.addFilter("bodyImage", require("./src/utils/filters/bodyImage.js") );
  config.addFilter("md", function(rawString) {
    return md.render(rawString);
  });
  
  // add support for syntax highlighting
  config.addPlugin(syntaxHighlight);

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // add sass
  sass('./src/site/_includes/scss/app.scss', './dist/css/app.css', env);

  // add head.js
  // minifyJs('./src/site/_includes/js/head.js','./dist/js/head.js',env);

  // compress and combine js files
  config.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  config.addNunjucksFilter("rssLastUpdatedDate", collection => {
    if( !collection || !collection.length ) {
      throw new Error( "Collection is empty in rssLastUpdatedDate filter." );
    }
    // Newest date in the collection
    return dateToISO(collection[ collection.length - 1 ].date);
  });

  config.addNunjucksFilter("rssDate", dateObj => dateToISO(dateObj));

  config.addNunjucksFilter("absoluteUrl", (href, base) => absoluteUrl(href, base));

  config.addNunjucksAsyncFilter("htmlToAbsoluteUrls", (htmlContent, base, callback) => {
    if(!htmlContent) {
      callback(null, "");
      return;
    }

    htmlToAbsoluteUrls(htmlContent, base).then(result => {
      callback(null, result.html);
    });
  });


  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");
  config.addPassthroughCopy("./src/site/admin");
  config.addPassthroughCopy("./src/site/js/privacy.js");
  config.addPassthroughCopy({"./src/site/icons": "/"});
  config.addPassthroughCopy("./robots.txt");

  // make the seed target act like prod
  env = (env=="seed") ? "prod" : env;
  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data/${env}`
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};