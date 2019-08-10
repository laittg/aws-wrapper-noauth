'use strict'

var AWS = require('aws-sdk')

module.exports = function () {
  return new Promise((resolve, reject) => {
    var sts = new AWS.STS()
    sts.getCallerIdentity({}, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Account)
      }
    })
  })
}
