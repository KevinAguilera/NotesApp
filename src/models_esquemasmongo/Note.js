const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  // por cada nota que guarden tambien guardar a que usuario pertenece
  user: {
    type: String,
    require: true
  }
})

module.exports = model('Note', NoteSchema);
