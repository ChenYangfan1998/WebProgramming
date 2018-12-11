module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Diary', {
    src: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    content: DataTypes.STRING,
    username: DataTypes.STRING
  })
}
