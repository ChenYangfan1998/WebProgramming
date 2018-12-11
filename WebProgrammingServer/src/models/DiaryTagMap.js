module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DiaryTagMap', {
    tagContent: DataTypes.INTEGER,
    diaryId: DataTypes.INTEGER
  })
}
