module.exports = {
  port: process.env.PORT || 2800,
  db: {
    database: process.env.DB_NAME || 'tabtracker',
    user: process.env.DB_USER || 'tabtracker',
    password: process.env.DB_PASS || 'tabtracker',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: './tabtracker.sqlite'
    }
  },
  uploadUrl: 'src/public/upload/',
  user: {
    jwtSecret: process.env.JWT_SECRET || 'CREATE TABLE IF NOT EXISTS '
  }
}
