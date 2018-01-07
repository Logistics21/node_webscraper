//make ajax requests from other websites
const rp = require('request-promise');
//use jQuery similar syntax in node
const cherio = require('cherio');
//displays results in console
const Table = require('cli-table');

const options = {
  uri: `https://www.google.com`,
  json:true,
  transform: function(body) {
    return cheerio.load(body);
  }
};
