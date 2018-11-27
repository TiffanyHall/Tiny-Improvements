const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
