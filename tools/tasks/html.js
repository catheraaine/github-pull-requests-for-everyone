'use strict';

const pkg = require('../../package.json');
const fs = require('fs');
const path = require('path');
const globby = require('globby');
const shell = require('shelljs');
const inform = require('../lib/inform');
const handlebars = require('handlebars');
const helpers = require('../lib/js/sb-handlebars-helpers');
const fm = require('front-matter');
const YAML = require('yamljs');

const PATHS = {
  layouts: './src/layouts',
  pages: './src/decks/**/*.hbs',
  partials: './src/partials/**/*.hbs',
  data: './src/slides',
  dest: './dist'
};

// HALP
const readFile = (file) => fs.readFileSync(file, 'utf8');
const tmplName = (filePath) => path.basename(filePath, '.hbs');
const ymlName = (filePath) => path.basename(filePath, '.yaml');

const registerHelpers = () => helpers.register(handlebars);

const registerPartials = () => {
  globby.sync(PATHS.partials).forEach((file) => {
    let fileName = tmplName(file);
    let fileOutput = readFile(file);
    handlebars.registerPartial(fileName, fileOutput);
  });
};

const getPageComponents = (pagePath) => {
  let file = readFile(pagePath);
  let frontMatter = fm(file);
  let layoutFile = frontMatter.attributes.layoutFile;
  let dataFile = frontMatter.attributes.dataFile;

  return {
    layout: getLayout(layoutFile),
    data: getData(dataFile),
    body: frontMatter.body,
    rename: frontMatter.attributes.rename
  };
};

const getLayout = (layoutFileName) => {
  if(!layoutFileName) return false;
  let layoutFilePath = path.join(PATHS.layouts, `${ layoutFileName }.hbs`);
  let layout = readFile(layoutFilePath);
  return layout;
};

const getData = (dataFiles) => {
  if(!dataFiles) return {};
  let dataFilePaths = path.join(PATHS.data, `${ dataFiles }.yaml`);
  let glob = globby.sync(dataFilePaths);
  return glob.reduce((data, file) => {
    let key = ymlName(file);
    let val = YAML.parse(readFile(file));
    data[key] = val;
    return data;
  }, {});
};

const renderPage = (pagePath) => {
  let pageComponents = getPageComponents(pagePath);
  let pageTemplate = handlebars.compile(pageComponents.body);
  let pageData = Object.assign(pageComponents.data, { pkg: pkg });
  let renderedPage = pageTemplate(pageData);

  if(pageComponents.layout) {
    var layoutTemplate = handlebars.compile(pageComponents.layout);
    var layoutData = Object.assign(pageData, { body: renderedPage });
    var layout = layoutTemplate(layoutData);
  }

  let pageName = pageComponents.rename ? pageComponents.rename : tmplName(pagePath);

  return {
    name: pageName,
    content: layout || renderedPage
  };
}

const isPage = (pathToTest) => {
  if(!pathToTest) return false;
  let pagesDir = './src/decks';
  let fileName = path.basename(pathToTest);
  let pages = fs.readdirSync(pagesDir);
  return pages.indexOf(fileName) > -1;
};

module.exports = function($event, $file) {
  inform.start('Compiling Handlebars Templates');

  let pagesToRender = isPage($file) ? $file : PATHS.pages;

  registerHelpers();
  registerPartials();

  globby.sync(pagesToRender).forEach((pagePath) => {
    let page = renderPage(pagePath);
    let destination = path.join(PATHS.dest, `${ page.name }.html`);
    shell.mkdir('-p', path.dirname(destination));
    fs.writeFileSync(destination, page.content);
    return inform.msg(`\n ${ path.basename(pagePath) } ---> ${ destination } ✓`);
  });

  return inform.done();
};
