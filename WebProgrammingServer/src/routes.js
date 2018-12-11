const multer = require('multer')
const UserController = require('./controller/UserController')
const DiaryController = require('./controller/DiaryController')
const config = require('./config/config')
const RestfulController = require('./controller/RestfulController')

module.exports = (app) => {
  const upload = multer({
    dest: config.uploadUrl
  })

  app.get('/', function (req, res) {
    res.render('index.html')
  })

  app.post('/register', UserController.register)

  app.post('/login', UserController.login)

  app.post('/uploadAvatar', upload.single('file'), UserController.uploadAvatar)

  app.post('/getUserInfoByUsername', UserController.getUserInfoByUsername)

  app.post('/auth', UserController.auth)

  app.post('/uploadDiary', upload.single('file'),
    DiaryController.uploadDiary)

  app.post('/deleteDiary', DiaryController.deleteDiary)

  app.post('/search', DiaryController.search)

  app.post('/updateDiaryTags', DiaryController.updateDiaryTags)

  app.post('/getAllTags', DiaryController.getAllTags)

  app.post('/getDiaryByUsername', DiaryController.getDiaryByUsername)

  app.get('/getWallPaper', RestfulController.getWallpaper)
}
