module.exports = {
  SecretsManager: {
    getSecretValue: require('./lib/SecretsManager/getSecretValue')
  },
  SSM: {
    getParameter: require('./lib/SSM/getParameter')
  }
}