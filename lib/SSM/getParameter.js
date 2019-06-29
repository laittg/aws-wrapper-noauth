'use strict'

var AWS = require('aws-sdk')

module.exports = function (region, paramName, withDecryption) {
  return new Promise((resolve, reject) => {
    var param = {
      Name: paramName,
      WithDecryption: withDecryption || false
    }
    var client = new AWS.SSM({
      region: region
    })
    client.getParameter(param, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data.Parameter.Value)
      }
    })
  })
}
