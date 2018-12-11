const { Diary, DiaryTagMap, Tag, SearchLog } = require('./../models')
const fs = require('fs')
const config = require('./../config/config')

/**
 * 获取标签的热度信息，算法为计算该标签下有多少文章
 * @param tag
 * @returns {Promise<number>}
 * @private
 */
async function _getSearched (tag) {
  let count = 0
  let allLog = await SearchLog.findAll()
  for (let log of allLog) {
    if (log.dataValues.content) {
      let likeValue = '%'
      for (let c of log.dataValues.content) {
        likeValue += c
        likeValue += '%'
      }

      const matchedTags = await Tag.findAll({
        where: {
          content: {
            $like: likeValue
          }
        }
      })

      if (matchedTags) {
        for (let matchedTag of matchedTags) {
          if (matchedTag.dataValues.content === tag) {
            count++
          }
        }
      }
    }
  }
  return count
}

module.exports = {

  /**
   * 上传日志，包含的内容有file、content、username、tags
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async uploadDiary (req, res) {
    try {
      if (!(req.body.content && req.body.username)) {
        res.status(400).send({
          error: '上传信息少于最低要求 || there are too less information to upload.'
        })
      }

      // 降低复杂度，直接使用数据库创建一个空的数据，由数据库的机制防止id冲突，但更多的插入操作使效率降低
      const diary = await Diary.create()
      const id = diary.dataValues.id

      // 修改名称，存储图片
      const filename = req.file.originalname
      let index1 = filename.lastIndexOf('.')
      let index2 = filename.length
      let result = filename.substring(index1, index2)
      const newPath = config.uploadUrl + id.toString() + result
      fs.rename(req.file.path, newPath,
        (err) => {
          if (err) {
            res.status(500).send({
              error: err.toString()
            })
            throw err
          }
          console.log('done')
        })

      // 修改数据库
      diary.src = 'upload/' + id.toString() + result
      diary.likes = 0
      diary.content = req.body.content ? req.body.content : ''
      diary.username = req.body.username
      diary.save()

      console.log(typeof req.body.tags)
      for (let tagContent of req.body.tags) {
        let tag = await Tag.findOne({
          where: {
            content: tagContent
          }
        })
        if (!tag) {
          tag = await Tag.create({
            content: tagContent
          })
        }
        await DiaryTagMap.create({
          tagContent: tag.dataValues.content,
          diaryId: diary.id
        })
      }

      res.send()
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  },

  /**
   * 删除日志，不仅要删除diary表，还要删除DiaryTagMap表
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async deleteDiary (req, res) {
    try {
      DiaryTagMap.destroy({
        where: {
          diaryId: req.diaryId
        }
      })
      Diary.destroy({
        where: {
          diaryId: req.diaryId
        }
      })
      res.send()
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  },

  /**
   * 搜索日志，返回相关tag以及相关搜索结果
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async search (req, res) {
    try {
      if (!req.body.content) {
        res.send()
      }
      if (req.body.username) {
        await SearchLog.create({
          username: req.body.username,
          content: req.body.content
        })
      }
      let like = '%'
      for (let c of req.body.content) {
        like += c
        like += '%'
      }
      let tags = await Tag.findAll({
        where: {
          content: {
            $like: like
          }
        }
      })

      if (req.body.content === '__getAll') {
        tags = await Tag.findAll()
      }

      let diariesContented = await Diary.findAll({
        where: {
          content: {
            $like: like
          }
        }
      })

      let result = {
        diaries: [],
        tags: []
      }

      for (let tag of tags) {
        let diaryIds = await DiaryTagMap.findAll({
          where: {
            tagContent: tag.dataValues.content
          }
        })
        let count = diaryIds.length
        for (let diaryId of diaryIds) {
          console.log(123)
          let diary = await Diary.findOne({
            where: {
              id: diaryId.dataValues.diaryId
            }
          })
          let flag = false
          for (let diaryToComp of diariesContented) {
            if (diary.dataValues.id === diaryToComp.dataValues.id) {
              flag = true
              break
            }
          }
          if (!flag) {
            diariesContented.push(diary)
          }
        }
        let hot = await _getSearched(tag.dataValues.content)
        result.tags.push({
          id: tag.dataValues.id,
          tag: tag.dataValues.content,
          count: count,
          hot: hot,
          createdAt: tag.dataValues.createdAt
        })
      }

      for (let diary of diariesContented) {
        let tags = await DiaryTagMap.findAll({
          where: {
            diaryId: diary.dataValues.id
          }
        })
        let tagsArray = []
        for (let tag of tags) {
          tagsArray.push(tag.dataValues.tagContent)
        }
        result.diaries.push({
          diary: diary.toJSON(),
          tags: tagsArray
        })
      }

      if (!result.diaries.length && !result.tags.length) {
        res.send()
      }
      res.send(result)
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 更新日志包含的标签，大致逻辑为完全删除旧值，然后插入新值。
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async updateDiaryTags (req, res) {
    try {
      await DiaryTagMap.destroy({
        where: {
          diaryId: req.body.diaryId
        }
      })
      for (let newTag of req.body.tags) {
        let tag = await Tag.findOne({
          where: {
            content: newTag
          }
        })
        if (!tag) {
          await Tag.create({
            content: newTag
          })
        }
        await DiaryTagMap.create({
          tagContent: newTag,
          diaryId: req.body.diaryId
        })
      }
      res.send()
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  },

  /**
   * 获取所有标签，返回包含热度的结果
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getAllTags (req, res) {
    try {
      const tags = await Tag.findAll({})
      let result = []
      for (let tag of tags) {
        const amount = await DiaryTagMap.count({
          where: {
            tagContent: tag.dataValues.content
          }
        })
        const hot = await _getSearched(tag.dataValues.content)
        result.push({
          id: tag.dataValues.id,
          tag: tag.dataValues.content,
          hot: hot,
          count: amount
        })
      }
      res.send(result)
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  },

  /**
   * 根据用户名获取其所有的日志，若传入用户名为__all，则返回所有的资料
   * @param req
   * @param res
   * @returns {Promise<void>}
   */
  async getDiaryByUsername (req, res) {
    try {
      let diaries
      if (req.body.username === '__all') {
        diaries = await Diary.findAll()
      } else {
        diaries = await Diary.findAll({
          where: {
            username: req.body.username
          }
        })
      }
      if (!diaries) {
        res.send({
          diaries: []
        })
      } else {
        let result = []
        for (let diary of diaries) {
          const tags = await DiaryTagMap.findAll({
            attributes: ['tagContent'],
            where: {
              diaryId: diary.dataValues.id
            }
          })
          let tagsResult = []
          for (let tag of tags) {
            tagsResult.push(tag.dataValues.tagContent)
          }
          result.push({
            diary: diary.toJSON(),
            tags: tagsResult
          })
        }
        res.send({
          diaries: result
        })
      }
    } catch (e) {
      res.status(500).send({
        error: e.toString()
      })
    }
  }
}
