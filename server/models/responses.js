const {Schema, model} = require("mongoose");

const answerSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: Schema.Types.Mixed,
    required: true,
  },
}, {_id: false});

const responseSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: "forms",
    required: true,
  },
  answers: [answerSchema],
}, {timestamps: true});

module.exports = model("responses", responseSchema);