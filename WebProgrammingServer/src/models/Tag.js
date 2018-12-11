module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Tag', {
    content: {
      type: DataTypes.STRING,
      unique: true
    }
  })
}
