const crypto = require('crypto')
const valorChave = crypto.randomBytes(64)
console.log(valorChave.toString('hex'))