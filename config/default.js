'use strict'

module.exports = {
  app: {
    port: 3000
  },
  log: {
    appenders: [ // 日志
      {
        type: 'console'
      }, // 控制台输出
      {
        type: 'file',
        filename: 'log/http.log',
        maxLogSize: 104857600,
        backups: 3,
        category: 'http',
        layout: { type: 'json', separator: ',' }
      },
      {
        type: 'file',
        filename: 'log/init.log',
        maxLogSize: 104857600,
        backups: 3,
        category: 'init',
        layout: { type: 'json', separator: ',' }
      },
      {
        type: 'file',
        filename: 'log/test.log',
        maxLogSize: 104857600,
        backups: 3,
        category: 'test',
        layout: { type: 'json', separator: ',' }
      }
    ]
  },
  db: {
    options: {
      host: 'localhost',
      port: 27017,
      user: '',
      pass: ''
    },
    database: 'cmTest'
  },
  TOKEN: {
    EXP: '24h',
    SECRET: 'testsecret'
  }
}
