const Sequelize = require('sequelize');
const db = require('config').db;
const debug = require('debug')('sd:models:db:connection');
const dbPool = db.pool;

const sequelize = new Sequelize(db.name, db.username, db.password, {
  host: db.host,
  port: db.port,
  dialect: 'mysql',
  logging: db.logging && debug,
  operatorsAliases: false,
  pool: {
    max: dbPool.max,
    min: dbPool.min,
    acquire: dbPool.acquire,
    idle: dbPool.idle
  },

    // Specify options, which are used when sequelize.define is called.
    // The following example:
    //   define: { timestamps: false }
    // is basically the same as:
    //   sequelize.define(name, attributes, { timestamps: false })
    // so defining the timestamps for each model will be not necessary
    // define: {
    //     underscored: false,
    //     freezeTableName: false,
    //     charset: 'utf8',
    //     dialectOptions: {
    //       collate: 'utf8_general_ci'
    //     },
    //     timestamps: true
    //   },  

    // isolation level of each transaction
    // defaults to dialect default
    // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ  
});

sequelize
  .authenticate()
  .then(() => {
    debug('Connection has been established successfully.');
  })
  .catch(err => {
    debug('Unable to connect to the database:', err);
  });

module.exports = sequelize;

