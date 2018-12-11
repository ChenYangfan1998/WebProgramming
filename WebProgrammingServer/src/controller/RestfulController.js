let request = require('request')

let options = { method: 'GET',
  url: 'http://cn.bing.com/HPImageArchive.aspx',
  qs: { format: 'js', idx: '0', n: '1' }
}

module.exports = {
  async getWallpaper (req, res) {
    try {
      request(options, function (error, response, body) {
        if (error) throw new Error(error)

        res.send(JSON.parse(body))
      })
    } catch (e) {
      res.status(500)
    }
  }
}
