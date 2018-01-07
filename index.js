//make ajax requests from other websites
const rp = require('request-promise');
//use jQuery similar syntax in node
const cheerio = require('cheerio');
//displays results in console
const Table = require('cli-table');

const ignore = [
  ".*@example.com$",
  ".*@domain.com$",
  ".*@mydomain.com$",
  ".*\.png$",
  ".*\.jpe?g$",
  ".*\.gif$",
  ".*@[0-9\.]+$" // no letters
];

const emails = [];

let table = new Table({
  head: ['email address'],
  colWidths: [15]
});

const options = {
  uri: `http://www.une.edu/registrar/staff-locations`, //test location
  // uri: `https://www.google.com`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    process.stdout.write('loading...\n');
    const $a = $('a[href*=mailto]')
      .each((i, el) => {
	      var email = $(el).attr('href').slice(7);
	      emails.push(email);
    })

    process.stdout.write('\n');
    console.log(emails.join("\n"));
  })
  .catch((err) => {
    console.log(err);
  });
