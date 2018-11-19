const Sequelize = require('sequelize');
const db = require('config').db;
const debug = require('debug')('app:models:db:connection');
const dbPool = db.pool;
const operatorsAliases = {
  $gte: Sequelize.Op.gte,
  $lte: Sequelize.Op.lte,
}
const connectionParams = {
  host: db.host,
  port: db.port,
  dialect: 'mysql',
  logging: db.logging && debug,
  operatorsAliases,
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
};
debug('db.name, db.username, db.password', db.name, db.username, db.password);
debug('connectionParams', connectionParams);

const sequelize = new Sequelize(db.name, db.username, db.password, connectionParams);

sequelize
  .authenticate()
  .then(() => {
    debug('Connection has been established successfully.');
  })
  .catch(err => {
    debug('Unable to connect to the database:', err);
  });

module.exports = sequelize;

