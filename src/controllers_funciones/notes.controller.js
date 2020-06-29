const notesCtrl = {};

// importar modelo de nota
const Note = require('../models_esquemasmongo/Note');

// funciones para mostrar formulario
notesCtrl.renderNoteForm = function(req, res) {
  res.render('notes/new-note');
};

notesCtrl.createNewNote = async function(req, res) {
  const {title, description} = req.body;
  const newNote = new Note({title, description});
  // por cada nota que guarde que tambien guarde el usuario
  newNote.user = req.user.id;
  //
  await newNote.save();
  req.flash('success_msg', 'Note Added Successfully');
  res.redirect('/notes')
};

notesCtrl.renderNotes = async function (req, res) {
  // user:req.user.id para filtrar las notas y solo se muestren a su respectivo usuario
  const notes = await Note.find({user:req.user.id}).lean();
  res.render('notes/all-notes', { notes });
};

notesCtrl.renderEditForm = async function(req, res) {
const note = await Note.findById(req.params.id).lean();
// validar para impedir que cualquiera pueda editar notas de otro usuario
if (note.user != req.user.id) {
  req.flash('error_msg', 'Not Authorized');
  return res.redirect('/notes');
}
  res.render('notes/edit-note', { note });
};

notesCtrl.updateNote = async function(req, res) {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description})
  req.flash('success_msg', 'Note Updated Successfully');
  res.redirect('/notes')
};

notesCtrl.deleteNote = async function (req, res) {
await Note.findByIdAndDelete(req.params.id).lean();
req.flash('success_msg', 'Note Deleted Successfully');
  res.redirect('/notes')
};

module.exports = notesCtrl;
