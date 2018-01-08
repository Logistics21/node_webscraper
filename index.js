//make ajax requests from other websites
const rp = require('request-promise');
//use jQuery similar syntax in node
const cheerio = require('cheerio');

const ignore = [
  ".*@example.com$",
  ".*@domain.com$",
  ".*@mydomain.com$",
  ".*\.png$",
  ".*\.jpe?g$",
  ".*\.gif$",
  ".*@[0-9\.]+$"
];

const uriQueue = process.argv.slice(2);

const options = {
  uri: 'https://www.google.com',
  transform: function(body) {
    return cheerio.load(body);
  }
};

uriQueue.forEach(uri => {
  options.uri = uri;

  rp(options)
  .then(($) => {
    let emails = [];
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
})
