var Sequelize = require('sequelize')
  , sequelize = new Sequelize('share', 'root', 'root', {
      dialect: "mysql", // or 'sqlite', mysql', 'mariadb'
      port:    80, // or 5432 (for postgres)
    })
 
sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })