# Description
#   A Hubot script that display taki
#
# Configuration:
#   None
#
# Commands:
#   hubot taki - display taki
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  request = require 'request-b'
  cheerio = require 'cheerio'

  robot.respond /taki$/i, (res) ->
    url = 'http://ja.wikipedia.org/wiki/日本の滝百選'
    request(url).then (r) ->
      $ = cheerio.load r.body
      takis = []
      $('ul.gallery li').each ->
        e = $ @
        image = 'http:' + e.find('img').attr('src')
        text = e.find('.gallerytext').text().trim()
        takis.push { image, text }
      taki = res.random takis
      res.send "#{taki.image}\n#{taki.text}"
