const {Schema, model} = require("mongoose");

const questionSchema = new Schema({
  title: String,
  answerType: {
    type: String,
    enum: ["number", "text", "textarea", "checkbox", "radio", "image", "file", "date", "time", "email", "dropdown", "range", "url"],
    default: "text",
  },
  options: [String],
  required: Boolean,
}, {_id: false});

const formSchema = new Schema({
  title: String,
  description: String,
  questions: [questionSchema]
}, {timestamps: true});

module.exports = model("forms", formSchema);