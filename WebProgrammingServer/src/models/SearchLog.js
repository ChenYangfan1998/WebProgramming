module.exports = (sequelize, DataTypes) => {
  return sequelize.define('SearchLog', {
    username: DataTypes.STRING,
    content: DataTypes.STRING
  })
}
