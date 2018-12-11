const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const fs = require('fs')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.user.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      if (!/[A-Z][a-zA-Z0-9]{7}/.exec(req.body.password)) {
        res.status(400).send({
          error: '密码必须按照如下格式：以一个大写字母开头，长度不小于8位。'
        })
      }

      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (e) {
      res.status(400).send({
        error: '这个用户名已经被使用了。'
      })
    }
  },

  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      if (!user) {
        res.status(403).send({
          error: '登录信息有误'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      console.log(isPasswordValid)
      if (!isPasswordValid) {
        res.status(403).send({
          error: '登录信息有误'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      console.log(err)
    }
  },

  async getUserInfoByUsername (req, res) {
    try {
      const userInfo = await User.findOne({
        where: {
          username: req.body.username
        }
      })
      res.send({
        userInfo: userInfo
      })
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  },

  async uploadAvatar (req, res) {
    try {
      // 修改名称，存储头像
      const newPath = config.uploadUrl + req.body.username
      await fs.rename(req.file.path, newPath,
        (err) => {
          if (err) {
            res.status(500).send({
              error: err.toString()
            })
            throw err
          }
        })
      console.log('done')
      res.send('修改成功')
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  },

  async auth (req, res) {
    res.send({
      message: 'success'
    })
  }
}
