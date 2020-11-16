const UglifyJS = require("uglify-js");
const fs = require('fs-extra');
const path = require('path');

module.exports = (sourcePath, outputPath, environment) => {
    //If cssPath directory doesn't exist...
    if(!fs.existsSync(path.dirname(outputPath))) {
        //Create cssPath directory recursively
        fs.mkdir(path.dirname(outputPath), {recursive: true});
        let minified = UglifyJS.minify(sourcePath);
          if( minified.error ) {
              console.log("UglifyJS error: ", minified.error);
              return sourcePath;
          }
        console.log(minified.code);
        fs.writeFile(outputPath, minified.code)
        .catch(error => console.error(error))
    }
    //Watch for changes to scssPath directory...
    /* if(environment == "dev"){
        fs.watch(path.dirname(scssPath), () => {
        //Render css from sass...
        sass.render({file: scssPath})
        //Then write result css string to cssPath file
        .then(result => fs.writeFile(cssPath, result.css.toString()))
        .catch(error => console.error(error))
        console.log(`Watching ${path.dirname(scssPath)}...`); 
        console.log('Watching SCSS')     
    });
    } else {
        sass.render({file: scssPath})
        //Then write result css string to cssPath file
        .then(result => fs.writeFile(cssPath, result.css.toString()))
        .catch(error => console.error(error))
    } */
    let minified = UglifyJS.minify(sourcePath);
      if( minified.error ) {
          return sourcePath;
      }
    fs.writeFile(outputPath, minified.code)
    .catch(error => console.error(error))
}