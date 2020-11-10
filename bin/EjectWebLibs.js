var fs = require("fs");
var path = require("path");

function EjectWebLibs () {

  this.start = (config) => {
    
    if (fs.existsSync(config.destination)) {
      console.log(`${config.destination} already exist`);
      return;
    }else{
      console.log(`${config.destination} does not exist. It will be created...`);
    }
    
    config.sources.forEach((source) =>{
      var libraryName = source.match(/([^\/]*)\/*$/)[1];
      var absoluteSourcePath = config.basePath+source;
      var absoluteDestinationPath = config.basePath+config.destination+"/"+libraryName;
      this.copyFolderSync(absoluteSourcePath, absoluteDestinationPath);
    });
  };

  // Copy the source folder to the destination
  this.copyFolderSync = (from, to) => {
    fs.mkdirSync(to,{recursive: true});
    fs.readdirSync(from).forEach(element => {
        if (fs.lstatSync(path.join(from, element)).isFile()) {
            fs.copyFileSync(path.join(from, element), path.join(to, element));
        } else {
            this.copyFolderSync(path.join(from, element), path.join(to, element));
        }
    });
  };

}

var sources = [
  '/node_modules/jquery/',
  '/node_modules/bootstrap/',
  '/node_modules/popper.js/',
  '/node_modules/bootstrap-rtl/',
  '/node_modules/fitvids/',
  '/node_modules/highlightjs/',
  '/node_modules/masonry-layout/',
  '/node_modules/sweetalert2/',
  '/node_modules/jquery-backstretch/'
];

var destination = '/themes/default/public/lib';

var ejectWebLibs = new EjectWebLibs();
ejectWebLibs.start({
  basePath:path.join(__dirname, '..'),
  sources:sources,
  destination:destination
});
