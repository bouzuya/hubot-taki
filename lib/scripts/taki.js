// Description
//   A Hubot script that display taki
//
// Configuration:
//   None
//
// Commands:
//   hubot taki - display taki
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  var cheerio, request;
  request = require('request-b');
  cheerio = require('cheerio');
  return robot.respond(/taki$/i, function(res) {
    var url;
    url = 'http://ja.wikipedia.org/wiki/日本の滝百選';
    return request(url).then(function(r) {
      var $, taki, takis;
      $ = cheerio.load(r.body);
      takis = [];
      $('ul.gallery li').each(function() {
        var e, image, text;
        e = $(this);
        image = 'http:' + e.find('img').attr('src');
        text = e.find('.gallerytext').text().trim();
        return takis.push({
          image: image,
          text: text
        });
      });
      taki = res.random(takis);
      return res.send("" + taki.image + "\n" + taki.text);
    });
  });
};
