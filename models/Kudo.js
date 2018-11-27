
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var KudoSchema = new Schema({
  body: {
    type: String
  },

  to: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ],

  from: [
    {
      type: Schema.Types.ObjectId,
      ref: "user"
    }
  ]

});

const Kudo = mongoose.model("Kudo", KudoSchema);

module.exports = Kudo;