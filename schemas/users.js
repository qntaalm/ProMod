const db = require('mongoose')

const user = new db.Schema({
  userId : String,
})


module.exports = db.model("users-schemas", user)