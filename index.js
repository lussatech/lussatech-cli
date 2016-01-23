#!/usr/bin/env node

'use strict';

var   fs = require('fs');
var path = require('path');
var argv = process.argv.slice(2);

switch (argv[0]) {
  case '-v':
  case '--version':
    version();
    break;
  case 'generate':
    generator();
    break;
  default:
    unrecognized();
}

function version() {
  console.log('lussatech-cli: ' + require('./package.json').version);
  process.exit(1);
}

function generator() {
  if (argv[1]) {
    var cli = path.resolve(process.cwd(), 'node_modules', argv[1], 'cli.js');
    
    if (fs.existsSync(cli)) {
      require(cli).run();
    } else {
      console.error('%s couldn\'t be found', argv[1]);
      process.exit(1);
    }  
  } else {
    console.error('please specify a library name');
    process.exit(1);
  }
}

function unrecognized() {
  console.error('Command `%s` unrecognized', argv.join(' '));
  process.exit(1);
}
