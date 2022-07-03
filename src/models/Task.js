/**
 * Models of data documents
 * @param Schema: Allows you to define the structure of a document(definition based on MongoDB concepts)
 * @param model: creates a data model that can be exported for use in other files, based on mongoose.
 */

const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model('Task', taskSchema);
