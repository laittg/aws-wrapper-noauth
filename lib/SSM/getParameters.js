'use strict'

var AWS = require('aws-sdk')

module.exports = function (region, paramNames, withDecryption) {
  return new Promise((resolve, reject) => {
    var params = {
      Names: paramNames,
      WithDecryption: withDecryption || false
    }
    var client = new AWS.SSM({
      region: region
    })
    client.getParameters(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        var results = {}
        data.Parameters.forEach(item => {
          results[item.Name] = item.Value
        })
        // Invalid parameter name will be undefined
        paramNames.forEach(name => {
          results[name] = results[name]
        })
        resolve(results)
      }
    })
  })
}
