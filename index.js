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

const options = {
  uri: `http://www.une.edu/registrar/staff-locations`, //test location
  // uri: `https://www.google.com`,
  transform: function(body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(($) => {
    process.stdout.write('loading');
    const $a = $('a[href*=mailto]');

    $a.each((i, el) => {
	    var email = $(el).attr('href').slice(7);
	    emails.push(email);
    });

    console.log(emails);
  })

  .catch((err) => {
    console.log(err);
  });

const printEmails = () => {

}
