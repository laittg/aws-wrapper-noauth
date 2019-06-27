'use strict'

var AWS = require('aws-sdk')

module.exports = function (region, secretName) {
  return new Promise((resolve, reject) => {
    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({
        region: region
    })
    client.getSecretValue({SecretId: secretName}, function (err, data) {
      var secret, decodedBinarySecret
      if (err) {
        reject(err)
      } else {
        // Decrypts secret using the associated KMS CMK.
        // Depending on whether the secret is a string or binary, one of these fields will be populated.
        if ('SecretString' in data) {
          secret = data.SecretString
        } else {
          let buff = new Buffer(data.SecretBinary, 'base64')
          decodedBinarySecret = buff.toString('ascii')
        }
        resolve(secret || decodedBinarySecret)
      }
    })
  })
}
